import { useState } from 'react'
import Navbar from '../components/Navbar'
import ProductModal from '../components/admin/ProductModal'
import TagModal from '../components/admin/TagModal'
import UserModal from '../components/admin/UserModal'
import NewsModal from '../components/admin/NewsModal'
import OrderTable from '../components/admin/OrderTable'
import ProductTable from '../components/admin/ProductTable'

type Props = {}
function AdminPage({ }: Props)
{
    const [shrinkOrders, setShrinkOrders] = useState(false)
    const [shrinkProducts, setShrinkProducts] = useState(false)

    const [showProductModal, setShowProductModal] = useState(false)
    const [showTagModal, setShowTagModal] = useState(false)
    const [showUserModal, setShowUserModal] = useState(false)
    const [showNewsModal, setShowNewsModal] = useState(false)
    const [editingProduct, setEditingProduct] = useState<{ [key: string]: any }>({})

    function handleAddProduct()
    {
        setEditingProduct({})
        setShowProductModal(true)
    }

    return (
        <>
            <title>Jiřího Dobroty | Admin</title>
            <Navbar />
            <div className='w-fit pt-24 px-3 pb-3 mx-auto'>
                <h1 className='mb-8 text-4xl text-center font-playfair uppercase'>
                    Admin
                </h1>

                <div className='flex justify-center gap-10'>
                    <button className='px-4 py-2 bg-blue-500 text-white rounded hover:scale-105 active:scale-95 transition-transform' onClick={handleAddProduct}>
                        Přidat produkt
                    </button>
                    <div className={`fixed top-0 left-0 w-full h-full z-40 flex items-center justify-center bg-gray-800 bg-opacity-50 transition-all ${showProductModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                        <ProductModal setShow={setShowProductModal} editingProduct={editingProduct} />
                    </div>

                    <button className='px-4 py-2 bg-blue-500 text-white rounded hover:scale-105 active:scale-95 transition-transform' onClick={() => setShowTagModal(true)}>
                        Štítky
                    </button>
                    <div className={`fixed top-0 left-0 w-full h-full z-40 flex items-center justify-center bg-gray-800 bg-opacity-50 transition-all ${showTagModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                        <TagModal setShow={setShowTagModal} />
                    </div>

                    <button className='px-4 py-2 bg-blue-500 text-white rounded hover:scale-105 active:scale-95 transition-transform' onClick={() => setShowUserModal(true)}>
                        Uživatelé
                    </button>
                    <div className={`fixed top-0 left-0 w-full h-full z-40 flex items-center justify-center bg-gray-800 bg-opacity-50 transition-all ${showUserModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                        <UserModal setShow={setShowUserModal} />
                    </div>

                    <button className='px-4 py-2 bg-blue-500 text-white rounded hover:scale-105 active:scale-95 transition-transform' onClick={() => setShowNewsModal(true)}>
                        Novinky
                    </button>
                    <div className={`fixed top-0 left-0 w-full h-full z-40 flex items-center justify-center bg-gray-800 bg-opacity-50 transition-all ${showNewsModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                        <NewsModal setShow={setShowNewsModal} />
                    </div>
                </div>

                <h1 className='m-8 text-4xl text-center hover:scale-105 active:scale-95 transition-transform font-playfair'>
                    <button onClick={() => setShrinkOrders(!shrinkOrders)}>
                        Objednávky
                    </button>
                </h1>
                <div className={`overflow-clip ${shrinkOrders && 'h-0'}`}>
                    <OrderTable />
                </div>

                <hr className='w-1/2 mx-auto my-8 border-black' />

                <h1 className='m-8 text-4xl text-center hover:scale-105 active:scale-95 transition-transform font-playfair'>
                    <button onClick={() => setShrinkProducts(!shrinkProducts)}>
                        Produkty
                    </button>
                </h1>
                <div className={`overflow-clip ${shrinkProducts && 'h-0'}`}>
                    <ProductTable setShow={setShowProductModal} setEditingProduct={setEditingProduct} />
                </div>
            </div>
        </>
    )
}
export default AdminPage