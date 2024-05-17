import { useState } from 'react'
import { auth, createOrder } from '../../utils/firebase'
import { useNavigate } from 'react-router-dom'
import { useGlobal } from '../../contexts/GlobalContext'
import { addOrder, clearCart, updateStock } from '../../contexts/Actions'

type Props = { setShow: React.Dispatch<React.SetStateAction<boolean>> }
function ConfirmModal({ setShow }: Props)
{
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const { state, dispatch } = useGlobal()
    const { cart } = state

    async function handleConfirm()
    {
        setLoading(true)

        const { id, order } = await createOrder(cart, auth.currentUser!.uid)

        for (const product of Object.keys(cart))
        {
            dispatch(updateStock(product, -cart[product]))
        }
        dispatch(addOrder(id, order))
        dispatch(clearCart())
        localStorage.removeItem('cart')

        setLoading(false)

        navigate('/order')
    }

    return (
        <div className='overflow-auto max-h-screen w-96 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded shadow-lg' onClick={e => e.stopPropagation()}>
            <h1 className='mx-2 mb-4 text-3xl font-bold underline'>
                Potvrzení objednávky
            </h1>
            <div className='flex justify-around'>
                <button className='w-2/5 py-2 my-5 text-amber-500 border-2 border-amber-500 rounded-lg' onClick={() => setShow(false)}>
                    Zrušit
                </button>
                <button className='w-2/5 py-2 my-5 text-white bg-amber-500 rounded-lg' disabled={loading} onClick={handleConfirm}>
                    Potvrdit
                </button>
            </div>
        </div>
    )
}
export default ConfirmModal