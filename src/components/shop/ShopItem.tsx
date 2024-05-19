import { useNavigate } from "react-router-dom"
import { useGlobal } from "../../contexts/GlobalContext"
import { addToCart } from "../../contexts/Actions"

type Props = { id: string, product: { [key: string]: any } }
function ShopItem({ id, product }: Props)
{
    const navigate = useNavigate()

    const { state, dispatch } = useGlobal()
    const { products, cart } = state

    function handleAddToCart(e: React.MouseEvent<HTMLButtonElement>)
    {
        e.stopPropagation()

        if (products[id].stock <= cart[id])
            return

        dispatch(addToCart(id))

        const storageCart = localStorage.getItem('cart')
        if (storageCart)
        {
            const parsedCart = JSON.parse(storageCart)
            localStorage.setItem('cart', JSON.stringify({ ...parsedCart, [id]: parsedCart[id] ? parsedCart[id] + 1 : 1 }))
        }
        else
        {
            localStorage.setItem('cart', JSON.stringify({ [id]: 1 }))
        }
    }

    return (
        <div className='w-64 m-1 p-3 flex flex-col items-center justify-center transition-all hover:shadow-xl cursor-pointer' onClick={() => navigate(`/product/${id}`)}>
            <img className='w-60 h-60 object-contain' src={product.images[0]} alt={product.name} />
            <div className='my-5 text-center'>
                <h3>{product.name}</h3>
                <p>{product.packagePrice},- Kč</p>
            </div>
            <button className='bg-stone-600 text-white px-2 py-1 rounded-lg hover:scale-105 active:scale-95 transition-transform' onClick={handleAddToCart}>
                Do košíku
            </button>
        </div>
    )
}
export default ShopItem