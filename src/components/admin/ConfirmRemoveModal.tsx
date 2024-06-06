import { useState } from 'react'
import { deleteProduct, hideProduct as hideProductFirebase } from '../../utils/firebase'
import { useGlobal } from '../../contexts/GlobalContext'
import { removeProduct, hideProduct as hideProductAction } from '../../contexts/Actions'

type Props = { setShow: React.Dispatch<React.SetStateAction<boolean>>, product: string }
function ConfirmRemoveModal({ setShow, product }: Props)
{
    const [loading, setLoading] = useState(false)

    const { state, dispatch } = useGlobal()
    const { products, orders } = state

    function isProductInOrder()
    {
        for (const order of Object.values(orders))
            if (product in order.cart)
                return true
        return false
    }

    async function handleConfirm()
    {
        setLoading(true)

        try
        {
            if (isProductInOrder())
            {
                await hideProductFirebase(product)
                dispatch(hideProductAction(product))
                return
            }

            await deleteProduct(product, products[product].images.length)
            dispatch(removeProduct(product))
        }
        catch
        {
            alert('Něco se pokazilo, produkt nelze smazat.')
        }
        finally
        {
            setShow(false)
            setLoading(false)
        }
    }

    return (
        <div className='overflow-auto max-h-screen w-96 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded shadow-lg' onClick={e => e.stopPropagation()}>
            <h1 className='mx-2 mb-4 text-3xl font-bold underline'>
                Smazat produkt
            </h1>
            <div className='flex justify-around'>
                <button className='w-2/5 py-2 my-5 bg-blue-500 text-white border-2 rounded-lg hover:scale-105 active:scale-95 transition-transform' onClick={() => setShow(false)}>
                    Zrušit
                </button>
                <button className='w-2/5 py-2 my-5 bg-red-500 text-white  rounded-lg hover:scale-105 active:scale-95 transition-transform' disabled={loading} onClick={handleConfirm}>
                    Potvrdit
                </button>
            </div>
        </div>
    )
}
export default ConfirmRemoveModal