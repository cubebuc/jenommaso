import { useState, useEffect } from 'react'
import { addProduct, editProduct } from '../utils/firebase'

type Props = { setShow: React.Dispatch<React.SetStateAction<boolean>>, setProducts: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>, tags: { [key: string]: string[] }, editingProduct: { [key: string]: any } }
function ProductModal({ setShow, setProducts, tags, editingProduct }: Props)
{
    const [unit, setUnit] = useState('kg')
    const [packageSize, setPackageSize] = useState(0)
    const [pricePerUnit, setPricePerUnit] = useState(0)
    const [packagePrice, setPackagePrice] = useState(0)

    function editing(): boolean
    {
        return Object.keys(editingProduct).length > 0
    }

    useEffect(() =>
    {
        const form = document.querySelector('form')
        form?.reset()
        if (editing())
        {
            if (form)
            {
                (form.name as any).value = editingProduct.name
                form.description.value = editingProduct.description
                form.price.value = editingProduct.price
                form.stock.value = editingProduct.stock
                const category = Array.from(form.category)
                category.forEach((tag: any) => tag.checked = editingProduct.category.includes(tag.value))
                const usage = Array.from(form.usage)
                usage.forEach((tag: any) => tag.checked = editingProduct.usage.includes(tag.value))
            }
        }
    }, [editingProduct])

    function handlePackageSizeChange(e: React.ChangeEvent<HTMLInputElement>)
    {
        if (e.currentTarget.value)
        {
            setPackageSize(parseFloat(e.currentTarget.value))
            setPackagePrice(Math.floor(parseFloat(e.currentTarget.value) * pricePerUnit))
        }
    }

    function handlePricePerUnitChange(e: React.ChangeEvent<HTMLInputElement>)
    {
        if (e.currentTarget.value)
        {
            setPricePerUnit(parseFloat(e.currentTarget.value))
            setPackagePrice(Math.floor(parseFloat(e.currentTarget.value) * packageSize))
        }
    }

    function handlePackagePriceChange(e: React.ChangeEvent<HTMLInputElement>)
    {
        if (e.currentTarget.value)
        {
            setPackagePrice(parseFloat(e.currentTarget.value))
            if (packageSize > 0)
                setPricePerUnit(Math.floor(parseFloat(e.currentTarget.value) / packageSize))
        }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>)
    {
        e.preventDefault()
        const form = e.currentTarget
        const name = (form.name as any).value
        const description = form.description.value
        const category = Array.from(form.category).filter((tag: any) => tag.checked).map((tag: any) => tag.value)
        const usage = Array.from(form.usage).filter((tag: any) => tag.checked).map((tag: any) => tag.value)
        const price = parseFloat(form.price.value)
        const stock = parseInt(form.stock.value)
        const images = form.image.files

        if (editing())
            var id = await editProduct(editingProduct.id, name, description, category, usage, price, stock, images, editingProduct.images.length)
        else
            var id = await addProduct(name, description, category, usage, price, stock, images)

        if (images.length > 0)
        {
            const imageObjects = Array.from(images).map((image: any) => URL.createObjectURL(image))
            setProducts(products => ({ ...products, [id]: { name, description, category, usage, price, stock, images: imageObjects } }))
        }
        else
            setProducts(products => ({ ...products, [id]: { name, description, category, usage, price, stock, images: editingProduct.images } }))
        setShow(false)
    }

    return (
        <div className='w-11/12 sm:w-5/6 md:w-2/3 lg:w-1/2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded shadow-lg' onClick={e => e.stopPropagation()}>
            <h1 className='ml-2 pb-1 text-3xl font-bold underline'>
                {editing() ? 'Edit' : 'Add'} Product
            </h1>
            <form onSubmit={handleSubmit}>
                <div className='flex items-center m-4'>
                    <label className='w-24 shrink-0 mr-3' htmlFor='options'>Category</label>
                    <div className='flex flex-wrap px-2'>
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
                    <label className='w-24 shrink-0 mr-3' htmlFor='name'>Name</label>
                    <input className='grow border px-4 py-2' type='text' id='name' name='name' placeholder='Good Product' required />
                </div>
                <div className='flex m-4'>
                    <label className='w-24 shrink-0 mr-3 mt-2' htmlFor='description'>Description</label>
                    <textarea className='grow border px-4 py-2' id='description' name='description' placeholder='This is a good product' required />
                </div>
                <div className='flex items-center m-4'>
                    <label className='w-24 shrink-0 mr-3' htmlFor='options'>Usage</label>
                    <div className='flex flex-wrap px-2'>
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
                    <label className='w-24 shrink-0 mr-3' htmlFor='price'>Package size</label>
                    <input className='grow border px-4 py-2' type='number' id='size' name='size' placeholder='9.99' value={packageSize} required onChange={handlePackageSizeChange} />
                    <select className='border px-3 py-2' id='unit' name='unit' required onChange={e => setUnit(e.currentTarget.value)}>
                        <option value='kg'>kg</option>
                        <option value='l'>l</option>
                        <option value='pcs'>pcs</option>
                    </select>
                </div>
                <div className='flex items-center m-4'>
                    <label className='w-24 shrink-0 mr-3' htmlFor='price'>Price / {unit}</label>
                    <input className='grow border px-4 py-2' type='number' id='price' name='price' placeholder='9.99' value={pricePerUnit} required onChange={handlePricePerUnitChange} />
                </div>
                <div className='flex items-center m-4'>
                    <label className='w-24 shrink-0 mr-3' htmlFor='price'>Package price</label>
                    <input className='grow border px-4 py-2' type='number' id='size' name='size' placeholder='9.99' value={packagePrice} required onChange={handlePackagePriceChange} />
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
            </form>
        </div >
    )
}
export default ProductModal