import { useState } from 'react'
import ConfirmRemoveModal from './ConfirmRemoveModal'
import { useGlobal } from '../../contexts/GlobalContext'
import { WhatsappShareButton } from 'react-share'

type Props = { setShowEdit: React.Dispatch<React.SetStateAction<boolean>>, setEditingProduct: React.Dispatch<React.SetStateAction<{ [key: string]: any }>> }
function ProductTable({ setShowEdit, setEditingProduct }: Props)
{
    const [showRemoveModal, setShowProductModal] = useState(false)
    const [removingProduct, setRemovingProduct] = useState('' as string)

    const { products, orders } = useGlobal().state

    function isProductInActiveOrder(id: string)
    {
        for (const order of Object.values(orders))
            if (!order.completed && id in order.cart)
                return true
        return false
    }

    function handleEditProduct(id: string)
    {
        setEditingProduct({ ...products[id], id })
        setShowEdit(true)
    }

    async function handleDeleteProduct(id: string)
    {
        if (isProductInActiveOrder(id))
        {
            alert('Nelze smazat produkt v aktivní objednávce')
            return
        }

        setRemovingProduct(id)
        setShowProductModal(true)
    }

    async function handleShareProduct(id: string)
    {
        console.log("Share product", id)
    }

    return (
        <>
            <div className={`fixed top-0 left-0 w-full h-full z-40 flex items-center justify-center bg-gray-800 bg-opacity-50 transition-all ${showRemoveModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <ConfirmRemoveModal setShow={setShowProductModal} product={removingProduct} />
            </div>
            <table className='table-auto m-auto'>
                <thead>
                    <tr>
                        <th className='border px-4 py-2'>Název</th>
                        <th className='border px-4 py-2'>Popis</th>
                        <th className='border px-4 py-2'>Kategorie</th>
                        <th className='border px-4 py-2'>Úprava</th>
                        <th className='border px-4 py-2'>Využití</th>
                        <th className='border px-4 py-2'>Velikost</th>
                        <th className='border px-4 py-2'>Cena/jednotku</th>
                        <th className='border px-4 py-2'>Cena balení</th>
                        <th className='border px-4 py-2'>Sklad</th>
                        <th className='border px-4 py-2'>Obrázek</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(products).sort((a, b) => a[1].name.localeCompare(b[1].name)).map(([id, product]) =>
                        !product.hidden &&
                        <tr key={id}>
                            <td className='border px-4 py-1 max-w-60'>{product.name}</td>
                            <td className='border px-4 py-1 max-w-40 truncate'>{product.description}</td>
                            <td className='border px-4 py-1 max-w-40 truncate'>{product.category.join(', ')}</td>
                            <td className='border px-4 py-1 max-w-40 truncate'>{product.treatment.join(', ')}</td>
                            <td className='border px-4 py-1 max-w-40 truncate'>{product.usage.join(', ')}</td>
                            <td className='border px-4 py-1 text-right max-w-40 truncate'>{product.size.toFixed(2)} {product.unit}</td>
                            <td className='border px-4 py-1 text-right max-w-40 truncate'>{product.pricePerUnit.toFixed(2)}</td>
                            <td className='border px-4 py-1 text-right max-w-40 truncate'>{product.packagePrice.toFixed(2)}</td>
                            <td className='border px-4 py-1 text-right max-w-40 truncate'>{product.stock}</td>
                            <td className='border w-20 h-20'><img src={product.images[0]} alt={product.name} className='object-contain' /></td>
                            <td className='pl-4 py-2'>
                                <button className='px-4 py-2 bg-blue-500 text-white rounded hover:scale-105 active:scale-95 transition-transform' onClick={() => handleEditProduct(id)}>
                                    Upravit
                                </button>
                            </td>
                            <td className='pl-4 py-2'>
                                <button className='px-4 py-2 bg-red-500 text-white rounded hover:scale-105 active:scale-95 transition-transform' onClick={() => handleDeleteProduct(id)}>
                                    Smazat
                                </button>
                            </td>
                            <td className='pl-4 py-2'>
                                <div className='px-4 py-2 bg-green-600 text-white rounded hover:scale-105 active:scale-95 transition-transform' onClick={() => handleShareProduct(id)}>
                                    <WhatsappShareButton url={`https://${window.location.host}/product/${id}`} title={product.name}>
                                        Sdílet
                                    </WhatsappShareButton>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    )
}
export default ProductTable