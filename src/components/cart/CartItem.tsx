import { useNavigate } from 'react-router-dom'
import { useGlobal } from '../../contexts/GlobalContext'
import { removeFromCart, setCartItem } from '../../contexts/Actions'

type Props = { id: string }
function CartItem({ id }: Props)
{
    const navigate = useNavigate()

    const { state, dispatch } = useGlobal()
    const { cart, products } = state

    const product = products[id]
    const quantity = cart[id]

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
        if (cart[id] === product.stock)
            return

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
        if (isNaN(value) || value < 0 || value > product.stock)
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

    return (
        <div className='py-1 flex flex-col md:flex-row items-center justify-center'>
            <div className='h-full me-5 flex cursor-pointer' onClick={() => navigate(`/product/${id}`)}>
                <img className='w-20 h-20 md:w-32 md:h-32 me-5 object-contain border border-stone-300' src={product.images[0]} alt={product.name} />
                <div className='w-60 md:w-56 h-full py-1 md:py-2 flex flex-col'>
                    <h3 className='mb-1 md:mb-2'>{product.name}</h3>
                    <p>{product.packagePrice.toFixed(2)},- Kč</p>
                </div>
            </div>
            <div className='w-full md:w-auto h-full py-2 md:mt-0 flex justify-between items-start'>
                <div className='flex items-center justify-center border-2 border-stone-500'>
                    <button className='ps-0.5 py-0.5 text-stone-400' onClick={() => handleMinus(id)}>
                        <svg viewBox='0 0 24 24' width='24' height='24'>
                            <path d='M6.00001 11.25L18 11.25L18 12.75L6.00001 12.75L6.00001 11.25Z' fill='currentColor' />
                        </svg>
                    </button>
                    <input className='w-8 text-center text-stone-600 outline-transparent' type='text' value={quantity} onChange={(e) => handleOnChange(e, id)} />
                    <button className='pe-0.5 py-0.5 text-stone-400' onClick={() => handlePlus(id)}>
                        <svg viewBox='0 0 24 24' width='24' height='24'>
                            <path d='M4 12H20M12 4V20' strokeWidth='1.5' stroke='currentColor' />
                        </svg>
                    </button>
                </div>
                <p className='w-36 py-1 text-center text-stone-600'>{(product.packagePrice * quantity).toFixed(2)},- Kč</p>
                <button className='text-2xl text-red-500 hover:scale-105 transition-transform' onClick={() => handleRemoveFromCart(id)}>
                    ✕
                </button>
            </div>
        </div>
    )
}
export default CartItem