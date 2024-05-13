import MainLayout from '../layouts/MainLayout'
import { useGlobal } from '../contexts/GlobalContext'
import { addToCart, setCartItem, removeFromCart } from '../contexts/Actions'

type Props = {}
function CartPage({ }: Props)
{
    const { state, dispatch } = useGlobal()
    const { cart, products } = state

    function handleMinus(id: string)
    {
        if (cart[id] === 0)
            return

        dispatch(setCartItem(id, cart[id] - 1))

        const _cart = localStorage.getItem('cart')
        if (_cart)
        {
            const parsedCart = JSON.parse(_cart)
            parsedCart[id]--
            localStorage.setItem('cart', JSON.stringify(parsedCart))
        }
    }

    function handlePlus(id: string)
    {
        dispatch(setCartItem(id, cart[id] + 1))

        const _cart = localStorage.getItem('cart')
        if (_cart)
        {
            const parsedCart = JSON.parse(_cart)
            parsedCart[id]++
            localStorage.setItem('cart', JSON.stringify(parsedCart))
        }
    }

    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>, id: string)
    {
        const value = e.target.value.length > 0 ? parseInt(e.target.value) : 0
        if (isNaN(value))
        {
            return
        }

        dispatch(setCartItem(id, value))

        const _cart = localStorage.getItem('cart')
        if (_cart)
        {
            const parsedCart = JSON.parse(_cart)
            parsedCart[id] = value
            localStorage.setItem('cart', JSON.stringify(parsedCart))
        }
    }


    function handleRemoveFromCart(id: string)
    {
        dispatch(removeFromCart(id))

        const cart = localStorage.getItem('cart')
        if (cart)
        {
            const parsedCart = JSON.parse(cart)
            delete parsedCart[id]
            localStorage.setItem('cart', JSON.stringify(parsedCart))
        }
    }

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
                    {Object.entries(cart).map(([id, quantity]) =>
                    {
                        const product = products[id]
                        return (
                            <div key={id} className='py-1 flex items-center justify-center'>
                                <img className='w-32 h-32 me-5 object-contain border border-stone-300' src={product.images[0]} alt={product.name} />
                                <div className='w-56 h-full py-2 flex flex-col'>
                                    <h3 className='mb-2'>{product.name}</h3>
                                    <p>{product.packagePrice} Kč</p>
                                </div>
                                <div className='h-full py-2 flex items-start'>
                                    <div className='flex items-center justify-center border-2 border-stone-500'>
                                        <button className='ps-0.5 py-0.5 text-stone-400' onClick={() => handleMinus(id)}>
                                            <svg viewBox='0 0 24 24' width='24' height='24'>
                                                <path d='M6.00001 11.25L18 11.25L18 12.75L6.00001 12.75L6.00001 11.25Z' fill='currentColor' />
                                            </svg>
                                        </button>
                                        <input className='w-8 text-center text-stone-600 outline-transparent' type='text' value={quantity} onChange={(e) => handleOnChange(e, id)} />
                                        <button className='pe-0.5 py-0.5 text-stone-400' onClick={() => handlePlus(id)}>
                                            <svg viewBox='0 0 24 24' width='24' height='24'>
                                                <path d='M4 12H20M12 4V20' stroke-width='1.5' stroke='currentColor' />
                                            </svg>
                                        </button>
                                    </div>
                                    <p className='w-36 py-1 text-center text-stone-600'>{product.packagePrice * quantity} Kč</p>
                                    <button className='text-2xl text-red-500' onClick={() => handleRemoveFromCart(id)}>
                                        ✕
                                    </button>
                                </div>
                            </div>
                        )
                    })}
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