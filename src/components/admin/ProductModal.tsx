import { useState, useEffect } from 'react'
import { addProduct, editProduct, hideProduct as hideProductFirebase, cloneImages } from '../../utils/firebase'
import { useGlobal } from '../../contexts/GlobalContext'
import { setProduct, hideProduct as hideProductAction } from '../../contexts/Actions'

type Props = { setShow: React.Dispatch<React.SetStateAction<boolean>>, editingProduct: { [key: string]: any } }
function ProductModal({ setShow, editingProduct }: Props)
{
    const { state, dispatch } = useGlobal()
    const { tags, orders } = state

    const [unit, setUnit] = useState('kg')
    const [packageSize, setPackageSize] = useState('')
    const [pricePerUnit, setPricePerUnit] = useState('')
    const [packagePrice, setPackagePrice] = useState('')
    const [loading, setLoading] = useState(false)

    function editing(): boolean
    {
        return Object.keys(editingProduct).length > 0
    }

    function isProductInActiveOrder(id: string)
    {
        for (const order of Object.values(orders))
            if (!order.completed && id in order.cart)
                return true
        return false
    }

    function isProductInOrder(id: string)
    {
        for (const order of Object.values(orders))
            if (id in order.cart)
                return true
        return false
    }

    function onlyStockChanged(name: string, description: string, category: string[], treatment: string[], usage: string[], size: number, unit: string, pricePerUnit: number, packagePrice: number, images: string[])
    {
        return name === editingProduct.name &&
            description === editingProduct.description &&
            JSON.stringify(category) === JSON.stringify(editingProduct.category) &&
            JSON.stringify(treatment) === JSON.stringify(editingProduct.treatment) &&
            JSON.stringify(usage) === JSON.stringify(editingProduct.usage) &&
            size === editingProduct.size &&
            unit === editingProduct.unit &&
            pricePerUnit === editingProduct.pricePerUnit &&
            packagePrice === editingProduct.packagePrice &&
            images.length === 0
    }

    useEffect(() =>
    {
        const form = document.querySelector('form')
        form?.reset()
        setPackageSize('')
        setPricePerUnit('')
        setPackagePrice('')

        if (editing())
        {
            setPackageSize(editingProduct.size.toString())
            setPricePerUnit(editingProduct.pricePerUnit.toString())
            setPackagePrice(editingProduct.packagePrice.toString())
            if (form)
            {
                (form.name as any).value = editingProduct.name
                form.description.value = editingProduct.description
                form.unit.value = editingProduct.unit
                form.stock.value = editingProduct.stock
                const category = Array.from(form.category)
                category.forEach((tag: any) => tag.checked = editingProduct.category.includes(tag.value))
                const treatment = Array.from(form.treatment)
                treatment.forEach((tag: any) => tag.checked = editingProduct.treatment.includes(tag.value))
                const usage = Array.from(form.usage)
                usage.forEach((tag: any) => tag.checked = editingProduct.usage.includes(tag.value))
            }
        }
    }, [editingProduct])

    function handlePackageSizeChange(e: React.ChangeEvent<HTMLInputElement>)
    {
        setPackageSize(e.currentTarget.value)
        if (e.currentTarget.value.length > 0 && pricePerUnit.length > 0)
            setPackagePrice((parseFloat(e.currentTarget.value) * parseFloat(pricePerUnit)).toString())

    }

    function handlePricePerUnitChange(e: React.ChangeEvent<HTMLInputElement>)
    {
        setPricePerUnit(e.currentTarget.value)
        if (e.currentTarget.value.length > 0 && packageSize.length > 0)
            setPackagePrice((parseFloat(e.currentTarget.value) * parseFloat(packageSize)).toString())
    }

    function handlePackagePriceChange(e: React.ChangeEvent<HTMLInputElement>)
    {
        setPackagePrice(e.currentTarget.value)
        if (e.currentTarget.value.length > 0 && packageSize.length > 0)
            setPricePerUnit((parseFloat(e.currentTarget.value) / parseFloat(packageSize)).toString())
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>)
    {
        e.preventDefault()
        setLoading(true)

        const form = e.currentTarget
        const name = (form.name as any).value
        const description = form.description.value
        const category = form.category ? Array.from(form.category).filter((tag: any) => tag.checked).map((tag: any) => tag.value) : []
        const treatment = form.treatment ? Array.from(form.treatment).filter((tag: any) => tag.checked).map((tag: any) => tag.value) : []
        const usage = form.usage ? Array.from(form.usage).filter((tag: any) => tag.checked).map((tag: any) => tag.value) : []
        const size = parseFloat(form.size.value)
        const unit = form.unit.value
        const pricePerUnit = parseFloat(form.pricePerUnit.value)
        const packagePrice = parseFloat(form.packagePrice.value)
        const stock = parseInt(form.stock.value)
        const images = form.image.files

        const productInActiveOrder = isProductInActiveOrder(editingProduct.id)
        const productInOrder = isProductInOrder(editingProduct.id)
        const onlyStock = onlyStockChanged(name, description, category, treatment, usage, size, unit, pricePerUnit, packagePrice, images)

        if (productInActiveOrder && !onlyStock)
        {
            console.log(onlyStock)
            alert('Nelze upravit produkt v aktivní objednávce')
            setLoading(false)
            return
        }

        if (editing() && (!productInOrder || onlyStock))
            var id = await editProduct(editingProduct.id, name, description, category, treatment, usage, size, unit, pricePerUnit, packagePrice, stock, images, editingProduct.images.length)
        else
            var id = await addProduct(name, description, category, treatment, usage, size, unit, pricePerUnit, packagePrice, stock, images)

        if (images.length > 0)
        {
            const imageObjects = Array.from(images).map((image: any) => URL.createObjectURL(image))
            dispatch(setProduct({ [id]: { name, description, category, treatment, usage, size, unit, pricePerUnit, packagePrice, stock, images: imageObjects } }))
        }
        else
            dispatch(setProduct({ [id]: { name, description, category, treatment, usage, size, unit, pricePerUnit, packagePrice, stock, images: editingProduct.images } }))

        if (editing() && productInOrder && !onlyStock)
        {
            if (images.length === 0)
                await cloneImages(editingProduct.id, id, editingProduct.images.length)
            await hideProductFirebase(editingProduct.id)
            dispatch(hideProductAction(editingProduct.id))
        }

        setLoading(false)
        setShow(false)
    }

    return (
        <div className='overflow-auto max-h-full w-11/12 sm:w-5/6 md:w-2/3 lg:w-1/2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded shadow-lg' onClick={e => e.stopPropagation()}>
            <div className='ml-2 mb-5 flex justify-between items-center'>
                <h1 className='text-3xl underline font-playfair'>
                    {editing() ? 'Upravit' : 'Přidat'} Produkt
                </h1>
                <button className='px-4 py-2 bg-red-500 text-white rounded hover:scale-105 active:scale-95 transition-transform' type='button' onClick={() => setShow(false)}>
                    Zavřít
                </button>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='flex items-center m-4'>
                    <label className='w-24 shrink-0 mr-3'>Kategorie</label>
                    <div className='grow flex flex-wrap px-3 py-2 border'>
                        {
                            tags?.category?.map((category, index) => (
                                <label key={index} className='mr-4'>
                                    <input type='checkbox' name='category' value={category} />
                                    <span className='ml-1'>{category}</span>
                                </label>
                            ))
                        }
                    </div>
                </div>
                <div className='flex items-center m-4'>
                    <label className='w-24 shrink-0 mr-3'>Úprava</label>
                    <div className='grow flex flex-wrap px-3 py-2 border'>
                        {
                            tags?.treatment?.map((treatment, index) => (
                                <label key={index} className='mr-4'>
                                    <input type='checkbox' name='treatment' value={treatment} />
                                    <span className='ml-1'>{treatment}</span>
                                </label>
                            ))
                        }
                    </div>
                </div>
                <div className='flex items-center m-4'>
                    <label className='w-24 shrink-0 mr-3' htmlFor='name'>Název</label>
                    <input className='grow border px-4 py-2' type='text' id='name' name='name' placeholder='Good Product' required />
                </div>
                <div className='flex m-4'>
                    <label className='w-24 shrink-0 mr-3 mt-2' htmlFor='description'>Popis</label>
                    <textarea className='grow border px-4 py-2 h-24' id='description' name='description' placeholder='This is a good product' required />
                </div>
                <div className='flex items-center m-4'>
                    <label className='w-24 shrink-0 mr-3'>Využití</label>
                    <div className='grow flex flex-wrap px-3 py-2 border'>
                        {
                            tags?.usage?.map((usage, index) => (
                                <label key={index} className='mr-4'>
                                    <input type='checkbox' name='usage' value={usage} />
                                    <span className='ml-1'>{usage}</span>
                                </label>
                            ))
                        }
                    </div>
                </div>
                <div className='flex items-center m-4'>
                    <label className='w-24 shrink-0 mr-3' htmlFor='size'>Velikost</label>
                    <input className='grow border px-4 py-2' type='number' id='size' name='size' placeholder='9.99' value={packageSize} required onChange={handlePackageSizeChange} />
                    <select className='border px-3 py-2' id='unit' name='unit' required onChange={e => setUnit(e.currentTarget.value)}>
                        <option value='kg'>kg</option>
                        <option value='l'>l</option>
                        <option value='pcs'>ks</option>
                    </select>
                </div>
                <div className='flex items-center m-4'>
                    <label className='w-24 shrink-0 mr-3' htmlFor='pricePerUnit'>Cena / {unit}</label>
                    <input className='grow border px-4 py-2' type='number' id='pricePerUnit' name='pricePerUnit' placeholder='9.99' value={pricePerUnit} required onChange={handlePricePerUnitChange} />
                </div>
                <div className='flex items-center m-4'>
                    <label className='w-24 shrink-0 mr-3' htmlFor='packagePrice'>Cena balení</label>
                    <input className='grow border px-4 py-2' type='number' id='packagePrice' name='packagePrice' placeholder='9.99' value={packagePrice} required onChange={handlePackagePriceChange} />
                </div>
                <div className='flex items-center m-4'>
                    <label className='w-24 shrink-0 mr-3' htmlFor='stock'>Sklad</label>
                    <input className='grow border px-4 py-2' type='number' id='stock' name='stock' placeholder='100' required />
                </div>
                <div className='flex items-center m-4'>
                    <label className='w-24 shrink-0 mr-3' htmlFor='image'>Obrázky</label>
                    <input className='grow border py-2 file:mx-4 file:rounded-full file:border-0 file:px-3' type='file' id='image' name='image' multiple accept='image/*' {...(!editing() && { required: true })} />
                </div>
                <button className='m-4 mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:scale-105 active:scale-95 transition-transform' type='submit' disabled={loading}>
                    {editing() ? 'Upravit' : 'Přidat'}
                </button>
                <button className='m-4 mb-2 px-4 py-2 bg-red-500 text-white rounded hover:scale-105 active:scale-95 transition-transform' type='button' onClick={() => setShow(false)}>
                    Zavřít
                </button>
            </form>
        </div >
    )
}
export default ProductModal