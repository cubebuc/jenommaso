import { deleteProduct } from '../utils/firebase'

type Props = { setShow: React.Dispatch<React.SetStateAction<boolean>>, products: { [key: string]: any }, setProducts: React.Dispatch<React.SetStateAction<{ [key: string]: {} }>>, setEditingProduct: React.Dispatch<React.SetStateAction<{ [key: string]: any }>> }
function ProductTable({ setShow, products, setProducts, setEditingProduct }: Props)
{
    function handleEditProduct(id: string)
    {
        setEditingProduct({ ...products[id], id })
        setShow(true)
    }

    async function handleDeleteProduct(id: string)
    {
        await deleteProduct(id, products[id].images.length)
        setProducts(products =>
        {
            const newProducts = { ...products }
            delete newProducts[id]
            return newProducts
        })
    }

    return (
        <table className='table-auto m-auto'>
            <thead>
                <tr>
                    <th className='border px-4 py-2'>Name</th>
                    <th className='border px-4 py-2'>Description</th>
                    <th className='border px-4 py-2'>Category</th>
                    <th className='border px-4 py-2'>Usage</th>
                    <th className='border px-4 py-2'>Size</th>
                    <th className='border px-4 py-2'>Price/unit</th>
                    <th className='border px-4 py-2'>Package Price</th>
                    <th className='border px-4 py-2'>Stock</th>
                    <th className='border px-4 py-2'>Image</th>
                </tr>
            </thead>
            <tbody>
                {Object.entries(products).map(([id, product]) =>
                    <tr key={id}>
                        <td className='border px-4 py-2'>{product.name}</td>
                        <td className='border px-4 py-2'>{product.description}</td>
                        <td className='border px-4 py-2'>{product.category.join(', ')}</td>
                        <td className='border px-4 py-2'>{product.usage.join(', ')}</td>
                        <td className='border px-4 py-2 text-right'>{product.size} {product.unit}</td>
                        <td className='border px-4 py-2 text-right'>{product.pricePerUnit}</td>
                        <td className='border px-4 py-2 text-right'>{product.packagePrice}</td>
                        <td className='border px-4 py-2 text-right'>{product.stock}</td>
                        <td className='border max-w-20'><img src={product.images[0]} alt={product.name} className='object-contain' /></td>
                        <td className='pl-4 py-2'>
                            <button className='px-4 py-2 bg-blue-500 text-white rounded' onClick={() => handleEditProduct(id)}>
                                Edit
                            </button>
                        </td>
                        <td className='pl-4 py-2'>
                            <button className='px-4 py-2 bg-red-500 text-white rounded' onClick={() => handleDeleteProduct(id)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}
export default ProductTable