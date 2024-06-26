import { useNavigate } from 'react-router-dom'
import { setOrderComplete } from '../../utils/firebase'
import { useGlobal } from '../../contexts/GlobalContext'
import { setOrderCompleted } from '../../contexts/Actions'

type Props = {}
function OrderTable({ }: Props)
{
    const navigate = useNavigate()

    const { state, dispatch } = useGlobal()
    const { usersWithRights, products, orders } = state

    function handleSetCompleted(id: string, completed: boolean)
    {
        setOrderComplete(id, completed).then(() => dispatch(setOrderCompleted(id, completed)))
    }

    return (
        <table className='table-auto m-auto'>
            <thead>
                <tr>
                    <th className='border px-4 py-2'>Jméno</th>
                    <th className='border px-4 py-2'>Email</th>
                    <th className='border px-4 py-2'>Telefon</th>
                    <th className='border px-4 py-2'>Adresa</th>
                    <th className='border px-4 py-2'>Datum</th>
                    <th className='border px-4 py-2'>Košík</th>
                    <th className='border px-4 py-2'>Celkem</th>
                    <th className='border px-4 py-2'>Hotovo</th>
                </tr>
            </thead>
            <tbody>
                {Object.entries(orders).sort((a, b) =>
                {
                    if (a[1].completed && !b[1].completed) return 1
                    if (!a[1].completed && b[1].completed) return -1
                    if (a[1].completed) return b[1].date - a[1].date
                    return a[1].date - b[1].date
                }).map(([id, order]) =>
                    <tr key={id}>
                        <td className='align-top border px-4 py-2 max-w-60'>{usersWithRights[order.user]?.name}</td>
                        <td className='align-top border px-4 py-2 max-w-60'>{usersWithRights[order.user]?.email}</td>
                        <td className='align-top border px-4 py-2 max-w-60 text-nowrap'>{usersWithRights[order.user]?.phone}</td>
                        <td className='align-top border px-4 py-2 max-w-60'>{usersWithRights[order.user]?.address}</td>
                        <td className='align-top border px-4 py-2 max-w-60'>{order.date.toDate().toLocaleDateString()}</td>
                        <td className='align-top border px-4 py-2'>
                            <ul>
                                {Object.entries(order.cart).map(([productID, quantity]) =>
                                {
                                    const product = products[productID]
                                    return (
                                        <li key={productID} className='cursor-pointer' onClick={() => navigate(`/product/${productID}`)}>
                                            <span className='flex justify-between'>
                                                <p className='me-5'>{product.name}</p>
                                                <p>{quantity as number}x ({product.packagePrice.toFixed(2)}/{product.unit})</p>
                                            </span>
                                        </li>
                                    )
                                }
                                )}
                            </ul>
                        </td>
                        <td className='align-top border px-4 py-2'>
                            <div className='flex justify-end'>
                                {Object.entries(order.cart).reduce((total, [productID, quantity]) => total + (products[productID]?.packagePrice * (quantity as number)), 0).toFixed(2)}
                            </div>
                        </td>
                        <td className='align-top border px-4 py-2'>
                            <div className='flex justify-center'>
                                <input className='size-6' type='checkbox' defaultChecked={order.completed} onChange={e => handleSetCompleted(id, e.target.checked)} />
                            </div>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}
export default OrderTable