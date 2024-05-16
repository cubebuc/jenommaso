import { useState, useEffect } from 'react'
import { addProduct, editProduct, hideProduct as hideProductFirebase } from '../../utils/firebase'
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

    function editing(): boolean
    {
        return Object.keys(editingProduct).length > 0
    }

    function isProductInOrder(id: string)
    {
        for (const order of Object.values(orders))
            if (id in order.cart)
                return true
        return false
    }

    useEffect(() =>
    {
        const form = document.querySelector('form')
        form?.reset()
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

        if (editing() && isProductInOrder(editingProduct.id))
        {
            await hideProductFirebase(editingProduct.id)
            dispatch(hideProductAction(editingProduct.id))
        }

        if (editing() && !isProductInOrder(editingProduct.id))
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
        setShow(false)
    }

    return (
        <div className='overflow-auto max-h-screen w-11/12 sm:w-5/6 md:w-2/3 lg:w-1/2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded shadow-lg' onClick={e => e.stopPropagation()}>
            <h1 className='ml-2 pb-1 text-3xl font-bold underline'>
                {editing() ? 'Edit' : 'Add'} Product
            </h1>
            <form onSubmit={handleSubmit}>
                <div className='flex items-center m-4'>
                    <label className='w-24 shrink-0 mr-3'>Category</label>
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
                    <label className='w-24 shrink-0 mr-3'>Treatment</label>
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
                    <label className='w-24 shrink-0 mr-3' htmlFor='name'>Name</label>
                    <input className='grow border px-4 py-2' type='text' id='name' name='name' placeholder='Good Product' required />
                </div>
                <div className='flex m-4'>
                    <label className='w-24 shrink-0 mr-3 mt-2' htmlFor='description'>Description</label>
                    <textarea className='grow border px-4 py-2 h-24' id='description' name='description' placeholder='This is a good product' required />
                </div>
                <div className='flex items-center m-4'>
                    <label className='w-24 shrink-0 mr-3'>Usage</label>
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
                    <label className='w-24 shrink-0 mr-3' htmlFor='size'>Package size</label>
                    <input className='grow border px-4 py-2' type='number' id='size' name='size' placeholder='9.99' value={packageSize} required onChange={handlePackageSizeChange} />
                    <select className='border px-3 py-2' id='unit' name='unit' required onChange={e => setUnit(e.currentTarget.value)}>
                        <option value='kg'>kg</option>
                        <option value='l'>l</option>
                        <option value='pcs'>pcs</option>
                    </select>
                </div>
                <div className='flex items-center m-4'>
                    <label className='w-24 shrink-0 mr-3' htmlFor='pricePerUnit'>Price / {unit}</label>
                    <input className='grow border px-4 py-2' type='number' id='pricePerUnit' name='pricePerUnit' placeholder='9.99' value={pricePerUnit} required onChange={handlePricePerUnitChange} />
                </div>
                <div className='flex items-center m-4'>
                    <label className='w-24 shrink-0 mr-3' htmlFor='packagePrice'>Package price</label>
                    <input className='grow border px-4 py-2' type='number' id='packagePrice' name='packagePrice' placeholder='9.99' value={packagePrice} required onChange={handlePackagePriceChange} />
                </div>
                <div className='flex items-center m-4'>
                    <label className='w-24 shrink-0 mr-3' htmlFor='stock'>Stock</label>
                    <input className='grow border px-4 py-2' type='number' id='stock' name='stock' placeholder='100' required />
                </div>
                <div className='flex items-center m-4'>
                    <label className='w-24 shrink-0 mr-3' htmlFor='image'>Image</label>
                    <input className='grow border py-2 file:mx-4 file:rounded-full file:border-0 file:px-3' type='file' id='image' name='image' multiple {...(!editing() && { required: true })} />
                </div>
                <button className='m-4 px-4 py-2 bg-blue-500 text-white rounded' type='submit'>
                    {editing() ? 'Edit' : 'Add'}
                </button>
                <button className='m-4 px-4 py-2 bg-blue-500 text-white rounded' type='button' onClick={() => setShow(false)}>
                    Close
                </button>
            </form>
        </div >
    )
}
export default ProductModal