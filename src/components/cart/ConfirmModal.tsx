import { useNavigate } from 'react-router-dom'
import { useGlobal } from '../../contexts/GlobalContext'
import { clearCart } from '../../contexts/Actions'

type Props = { setShow: React.Dispatch<React.SetStateAction<boolean>> }
function ConfirmModal({ setShow }: Props)
{
    const navigate = useNavigate()

    const { dispatch } = useGlobal()

    function handleConfirm()
    {
        // Actually handle the order

        navigate('/order')

        dispatch(clearCart())
        localStorage.removeItem('cart')
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
                <button className='w-2/5 py-2 my-5 text-white bg-amber-500 rounded-lg' onClick={handleConfirm}>
                    Potvrdit
                </button>
            </div>
        </div>
    )
}
export default ConfirmModal