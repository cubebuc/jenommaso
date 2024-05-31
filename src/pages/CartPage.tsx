import { useState } from 'react'
import MainLayout from '../layouts/MainLayout'
import CartItem from '../components/cart/CartItem'
import ConfirmModal from '../components/cart/ConfirmModal'
import { useGlobal } from '../contexts/GlobalContext'

type Props = {}
function CartPage({ }: Props)
{
    const [showConfirmModal, setShowConfirmModal] = useState(false)

    const { cart, products } = useGlobal().state

    function cartSize()
    {
        return Object.values(cart).reduce((acc, val) => acc + val, 0)
    }

    return (
        <MainLayout>
            <h1 className='mt-24 mb-8 text-4xl text-center font-playfair uppercase'>
                Košík
            </h1>
            <div className='mx-3 flex flex-col md:flex-row justify-center'>
                <div className='w-72 md:w-fit m-auto md:m-0 flex flex-col items-center'>
                    <h2 className='w-full py-5 mb-3 border-b border-stone-400 text-2xl'>
                        Můj košík
                    </h2>
                    {Object.keys(cart).map((id) => (
                        <CartItem key={id} id={id} />
                    ))}
                    {Object.keys(cart).length === 0 &&
                        <p className='text-lg text-stone-400'>
                            Košík je prázdný
                        </p>
                    }
                </div>
                <div className='w-72 mx-auto md:mx-0 md:ms-10 flex flex-col items-center'>
                    <h2 className='w-full py-5 text-2xl'>
                        Přehled objednávky
                    </h2>
                    <p className='w-full py-3 flex justify-between border-y border-stone-400'>
                        <span className='text-xl'>Celkem</span>
                        <span className='text-xl'>{(Object.entries(cart).reduce((acc, [id, quantity]) => acc + products[id].packagePrice * quantity, 0)).toFixed(2)},- Kč</span>
                    </p>
                    <button className='w-full py-2 my-5 text-white bg-amber-500 rounded-lg hover:scale-105 active:scale-95 transition-transform' onClick={() => cartSize() > 0 && setShowConfirmModal(true)}>
                        Objednat
                    </button>

                    <div className={`fixed top-0 left-0 w-full h-full z-40 flex items-center justify-center bg-gray-800 bg-opacity-50 transition-all ${showConfirmModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                        <ConfirmModal setShow={setShowConfirmModal} />
                    </div>
                </div>
            </div>
        </MainLayout >
    )
}
export default CartPage