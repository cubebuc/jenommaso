import { deleteProduct } from '../../utils/firebase'
import { useGlobal } from '../../contexts/GlobalContext'
import { removeProduct } from '../../contexts/Actions'

type Props = { setShow: React.Dispatch<React.SetStateAction<boolean>>, setEditingProduct: React.Dispatch<React.SetStateAction<{ [key: string]: any }>> }
function ProductTable({ setShow, setEditingProduct }: Props)
{
    const { state, dispatch } = useGlobal()
    const { products } = state

    function handleEditProduct(id: string)
    {
        setEditingProduct({ ...products[id], id })
        setShow(true)
    }

    async function handleDeleteProduct(id: string)
    {
        await deleteProduct(id, products[id].images.length)
        dispatch(removeProduct(id))
    }

    return (
        <table className='table-auto m-auto'>
            <thead>
                <tr>
                    <th className='border px-4 py-2'>Name</th>
                    <th className='border px-4 py-2'>Description</th>
                    <th className='border px-4 py-2'>Category</th>
                    <th className='border px-4 py-2'>Treatment</th>
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
                        <td className='border px-4 py-1 max-w-40 truncate'>{product.name}</td>
                        <td className='border px-4 py-1 max-w-40 truncate'>{product.description}</td>
                        <td className='border px-4 py-1 max-w-40 truncate'>{product.category.join(', ')}</td>
                        <td className='border px-4 py-1 max-w-40 truncate'>{product.treatment.join(', ')}</td>
                        <td className='border px-4 py-1 max-w-40 truncate'>{product.usage.join(', ')}</td>
                        <td className='border px-4 py-1 text-right max-w-40 truncate'>{product.size.toFixed(2)} {product.unit}</td>
                        <td className='border px-4 py-1 text-right max-w-40 truncate'>{product.pricePerUnit.toFixed(2)}</td>
                        <td className='border px-4 py-1 text-right max-w-40 truncate'>{product.packagePrice.toFixed(2)}</td>
                        <td className='border px-4 py-1 text-right max-w-40 truncate'>{product.stock}</td>
                        <td className='border w-20 h-20'><img src={product.images[0]} alt={product.name} className='object-contain' /></td>
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