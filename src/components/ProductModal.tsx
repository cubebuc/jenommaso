import { DocumentData } from 'firebase/firestore'
import { addProduct } from '../utils/firebase'

type Props = { setShow: React.Dispatch<React.SetStateAction<boolean>>, setProducts: React.Dispatch<React.SetStateAction<{ [key: string]: DocumentData }>>, tags: { [key: string]: string[] } }
function ProductModal({ setShow, setProducts, tags }: Props)
{
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
        const image = form.image.files?.[0]

        const id = await addProduct(name, description, category, usage, price, stock, image)
        setProducts(products => ({ ...products, [id]: { name, description, category, usage, price, stock, image: URL.createObjectURL(image) } }))
        setShow(false)
    }

    return (
        <div className='w-11/12 sm:w-5/6 md:w-2/3 lg:w-1/2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded shadow-lg' onClick={e => e.stopPropagation()}>
            <h1 className='ml-2 pb-1 text-3xl font-bold underline'>
                New Product
            </h1>
            <form onSubmit={handleSubmit}>
                <div className='flex items-center m-4'>
                    <label className='w-24 shrink-0 mr-3' htmlFor='name'>Name</label>
                    <input className='grow border px-4 py-2' type='text' id='name' name='name' placeholder='Good Product' required />
                </div>
                <div className='flex m-4'>
                    <label className='w-24 shrink-0 mr-3 mt-2' htmlFor='description'>Description</label>
                    <textarea className='grow border px-4 py-2' id='description' name='description' placeholder='This is a good product' required />
                </div>
                <div className='flex items-center m-4 my-5'>
                    <label className='w-24 shrink-0 mr-3' htmlFor='options'>Category</label>
                    <div className='flex flex-wrap px-4'>
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
                <div className='flex items-center m-4 mb-5'>
                    <label className='w-24 shrink-0 mr-3' htmlFor='options'>Usage</label>
                    <div className='flex flex-wrap px-4'>
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
                    <label className='w-24 shrink-0 mr-3' htmlFor='price'>Price</label>
                    <input className='grow border px-4 py-2' type='number' id='price' name='price' placeholder='9.99' required />
                </div>
                <div className='flex items-center m-4'>
                    <label className='w-24 shrink-0 mr-3' htmlFor='stock'>Stock</label>
                    <input className='grow border px-4 py-2' type='number' id='stock' name='stock' placeholder='100' required />
                </div>
                <div className='flex items-center m-4'>
                    <label className='w-24 shrink-0 mr-3' htmlFor='image'>Image</label>
                    <input className='grow border py-2 file:mx-4 file:rounded-full file:border-0 file:px-3' type='file' id='image' name='image' required />
                </div>
                <button className='m-4 px-4 py-2 bg-blue-500 text-white rounded' type='submit'>
                    Add Product
                </button>
            </form>
        </div >
    )
}
export default ProductModal