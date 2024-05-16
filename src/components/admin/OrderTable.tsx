import { setOrderComplete } from '../../utils/firebase'
import { useGlobal } from '../../contexts/GlobalContext'
import { setOrderCompleted } from '../../contexts/Actions'

type Props = {}
function OrderTable({ }: Props)
{
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
                    <th className='border px-4 py-2'>Customer</th>
                    <th className='border px-4 py-2'>Date</th>
                    <th className='border px-4 py-2'>Cart</th>
                    <th className='border px-4 py-2'>Total</th>
                    <th className='border px-4 py-2'>Completed</th>
                </tr>
            </thead>
            <tbody>
                {Object.entries(orders).map(([id, order]) =>
                    <tr key={id}>
                        <td className='align-top border px-4 py-2'>{usersWithRights[order.user]?.name}</td>
                        <td className='align-top border px-4 py-2'>{order.date.toDate().toLocaleString()}</td>
                        <td className='border px-4 py-2'>
                            <ul>
                                {Object.entries(order.cart).map(([productID, quantity]) =>
                                    <li key={productID}>
                                        <span className='flex justify-between'>
                                            <p className='me-5'>{products[productID]?.name}</p>
                                            <p>{quantity as number}x</p>
                                        </span>
                                    </li>
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