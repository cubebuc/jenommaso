import { useEffect, useState } from 'react'
import { auth, getMyUserDetails } from '../utils/firebase'
import { useGlobal } from '../contexts/GlobalContext'
import MainLayout from '../layouts/MainLayout'

type Props = {}
function ProfilePage({ }: Props)
{
    const [myUserDetails, setMyUserDetails] = useState<{ [key: string]: any }>()

    const { orders, products } = useGlobal().state

    useEffect(() =>
    {
        getMyUserDetails().then(setMyUserDetails)
    }, [])

    return (
        <MainLayout>
            <h1 className='mt-24 mb-3 text-4xl text-center font-playfair uppercase'>
                Profil
            </h1>
            <div className='flex flex-col items-center'>
                <div className='border p-4 m-4 w-96'>
                    <h2 className='text-xl font-semibold'>Moje údaje</h2>
                    <p>Jméno: {myUserDetails?.name}</p>
                    <p>Email: {myUserDetails?.email}</p>
                    <p>Telefon: {myUserDetails?.phone}</p>
                    <p>Adresa: {myUserDetails?.address}</p>
                </div>
            </div>
            <h1 className='mt-10 mb-3 text-4xl text-center font-playfair uppercase'>
                Historie objednávek
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
                                        <p>{quantity as number} x {products[productID]?.packagePrice.toFixed(2)},- Kč</p>
                                    </span>
                                </li>
                            )}
                        </ul>
                        <hr className='my-2' />
                        <p>Total: {Object.entries(order.cart).reduce((total, [productID, quantity]) => total + (products[productID]?.packagePrice * (quantity as number)), 0).toFixed(2)},- Kč</p>
                        <p>Completed: {order.completed ? 'Yes' : 'No'}</p>
                    </div>
                )}
            </div>
        </MainLayout>
    )
}
export default ProfilePage