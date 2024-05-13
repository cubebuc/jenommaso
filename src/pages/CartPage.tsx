import { useNavigate } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import CartItem from '../components/cart/CartItem'
import { useGlobal } from '../contexts/GlobalContext'

type Props = {}
function CartPage({ }: Props)
{
    const navigate = useNavigate()

    const { cart, products } = useGlobal().state

    function handleOrder()
    {
        alert('Jupí! Bude maso!')
    }

    return (
        <MainLayout>
            <h1 className='mt-24 mb-8 text-3xl text-center'>
                Cart Page
            </h1>
            <div className='flex justify-center'>
                <div className='flex flex-col items-center'>
                    <h2 className='w-full py-5 mb-3 border-b border-stone-400 text-2xl text-stone-600'>
                        Můj košík
                    </h2>
                    {Object.keys(cart).map((id) => (
                        <CartItem key={id} id={id} />
                    ))}
                </div>
                <div className='w-72 ms-10 flex flex-col items-center'>
                    <h2 className='w-full py-5 text-2xl text-stone-600'>
                        Přehled objednávky
                    </h2>
                    <p className='w-full py-3 flex justify-between border-y border-stone-400'>
                        <span className='text-xl'>Celkem</span>
                        <span className='text-xl'>{Object.entries(cart).reduce((acc, [id, quantity]) => acc + products[id].packagePrice * quantity, 0)} Kč</span>
                    </p>
                    <button className='w-full py-2 mt-5 text-white bg-amber-500 rounded-lg' onClick={handleOrder}>
                        Objednat
                    </button>
                </div>
            </div>
        </MainLayout >
    )
}
export default CartPage