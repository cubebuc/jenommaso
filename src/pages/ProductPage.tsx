import { useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import { addToCart } from '../contexts/Actions'
import { useGlobal } from '../contexts/GlobalContext'

type Props = {}
function ProductPage({ }: Props)
{
    const [selectedImage, setSelectedImage] = useState(0)

    const { id } = useParams<{ id: string }>()

    const { state, dispatch } = useGlobal()
    const { products, cart } = state

    function handleAddToCart(e: React.MouseEvent<HTMLButtonElement>)
    {
        e.stopPropagation()

        if (id === undefined || !products[id])
            return

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

    console.log(products[id as any])

    if (id === undefined || !products[id])
        return <Navigate to='/shop' />

    return (
        <MainLayout>
            <div className='mt-32 px-3 pb-10 flex flex-col md:flex-row justify-center items-center md:items-start'>
                <div className='w-96 md:mr-10'>
                    <img className='w-96 h-96 p-1 object-contain border' src={products[id].images[selectedImage]} alt={products[id].name} />
                    <div className='flex flex-wrap justify-center mt-2'>
                        {products[id].images.map((image: string, index: number) =>
                            <img
                                key={index}
                                className='w-20 h-20 object-contain m-1 cursor-pointer'
                                src={image}
                                alt={products[id].name}
                                onClick={() => setSelectedImage(index)}
                            />
                        )}
                    </div>
                </div>
                <div className='w-5/6 md:w-96'>
                    <h1 className='text-3xl mt-5'>{products[id].name}</h1>
                    <p className='text-lg mt-2'>{products[id].description}</p>
                    {
                        products[id].category.length > 0 &&
                        <p className='mt-4'>Kategorie: {products[id].category.join(', ')}</p>
                    }
                    {
                        products[id].treatment.length > 0 &&
                        <p>Úprava: {products[id].treatment.join(', ')}</p>
                    }
                    {
                        products[id].usage.length > 0 &&
                        <p>Využití: {products[id].usage.join(', ')}</p>
                    }
                    <p className='text-lg mt-5'>Skladem: <span className='text-green-600'>{products[id].stock} ks</span></p>
                    <p className='text-xl'>Cena za balení: {products[id].packagePrice.toFixed(2)},- Kč</p>
                    <button
                        className='bg-stone-600 text-white px-2 py-1 rounded-lg hover:scale-105 active:scale-95 transition-transform mt-5' onClick={handleAddToCart}>
                        Do košíku
                    </button>
                </div>

            </div>
        </MainLayout>
    )
}
export default ProductPage