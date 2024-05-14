import { useState, useEffect } from "react"
import { getOrders, setOrderComplete } from "../../utils/firebase"
import { useGlobal } from "../../contexts/GlobalContext"

type Props = {}
function OrderTable({ }: Props)
{
    // orders is a map of order IDs to order objects
    // each order is a map of product IDs to quantities
    const [orders, setOrders] = useState<{ [key: string]: any }>({})

    const { usersWithRights, products } = useGlobal().state

    useEffect(() =>
    {
        getOrders().then(orders =>
        {
            const sortedOrders = Object.entries(orders).sort((a, b) => a[1].completed - b[1].completed || b[1].date - a[1].date)
            setOrders(Object.fromEntries(sortedOrders))
        })
    }, [])

    function handleSetCompleted(id: string, completed: boolean)
    {
        setOrderComplete(id, completed).then(() => setOrders({ ...orders, [id]: { ...orders[id], completed } }))
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
                        <td className='align-top border px-4 py-2'>{order.date.toDate().toLocaleDateString()}</td>
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
                                {Object.entries(order.cart).reduce((total, [productID, quantity]) => total + (products[productID]?.pricePerUnit * (quantity as number)), 0).toFixed(2)}
                            </div>
                        </td>
                        <td className='align-top border px-4 py-2'>
                            <div className='flex justify-center'>
                                <input className='size-6' type='checkbox' checked={order.completed} onChange={e => handleSetCompleted(id, e.target.checked)} />
                            </div>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}
export default OrderTable