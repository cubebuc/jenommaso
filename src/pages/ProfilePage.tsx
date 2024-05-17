import { auth } from '../utils/firebase'
import { useGlobal } from '../contexts/GlobalContext'
import MainLayout from '../layouts/MainLayout'

type Props = {}
function ProfilePage({ }: Props)
{
    const { orders, products } = useGlobal().state

    return (
        <MainLayout>
            <h1 className='mt-24 mb-8 text-4xl text-center font-playfair uppercase'>
                Profil
            </h1>
            <div className='flex flex-col items-center'>
                {Object.entries(orders).sort((a, b) =>
                {
                    return b[1].date - a[1].date
                }).map(([id, order]) =>
                    order.user === auth.currentUser?.uid &&
                    <div key={id} className='border p-4 m-4 w-96'>
                        <h2 className='text-xl font-semibold'>Order</h2>
                        <p>Date: {order.date.toDate().toLocaleString()}</p>
                        <hr className='my-2' />
                        <ul>
                            {Object.entries(order.cart).map(([productID, quantity]) =>
                                <li key={productID}>
                                    <span className='flex justify-between'>
                                        <p>{products[productID]?.name}</p>
                                        <p>{quantity as number}x</p>
                                    </span>
                                </li>
                            )}
                        </ul>
                        <hr className='my-2' />
                        <p>Total: {Object.entries(order.cart).reduce((total, [productID, quantity]) => total + (products[productID]?.packagePrice * (quantity as number)), 0).toFixed(2)}</p>
                        <p>Completed: {order.completed ? 'Yes' : 'No'}</p>
                    </div>
                )}
            </div>
        </MainLayout>
    )
}
export default ProfilePage