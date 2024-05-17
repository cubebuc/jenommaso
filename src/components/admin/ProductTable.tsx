import { deleteProduct, hideProduct as hideProductFirebase } from '../../utils/firebase'
import { useGlobal } from '../../contexts/GlobalContext'
import { removeProduct, hideProduct as hideProductAction } from '../../contexts/Actions'

type Props = { setShow: React.Dispatch<React.SetStateAction<boolean>>, setEditingProduct: React.Dispatch<React.SetStateAction<{ [key: string]: any }>> }
function ProductTable({ setShow, setEditingProduct }: Props)
{
    const { state, dispatch } = useGlobal()
    const { products, orders } = state

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

    function handleEditProduct(id: string)
    {
        if (isProductInActiveOrder(id))
        {
            alert('Cannot edit product in an active order')
            return
        }

        setEditingProduct({ ...products[id], id })
        setShow(true)
    }

    async function handleDeleteProduct(id: string)
    {
        if (isProductInActiveOrder(id))
        {
            alert('Cannot delete product in an active order')
            return
        }

        if (isProductInOrder(id))
        {
            await hideProductFirebase(id)
            dispatch(hideProductAction(id))
            return
        }

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
                {Object.entries(products).sort((a, b) => a[1].name.localeCompare(b[1].name)).map(([id, product]) =>
                    !product.hidden &&
                    <tr key={id}>
                        <td className='border px-4 py-1 max-w-60'>{product.name}</td>
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