import { useState } from 'react'
import MainLayout from '../layouts/MainLayout'
import ProductModal from '../components/admin/ProductModal'
import TagModal from '../components/admin/TagModal'
import UserModal from '../components/admin/UserModal'
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
    const [editingProduct, setEditingProduct] = useState<{ [key: string]: any }>({})

    function handleAddProduct()
    {
        setEditingProduct({})
        setShowProductModal(true)
    }

    return (
        <MainLayout>
            <div className='w-fit px-3 mx-auto'>
                <h1 className='mt-24 mb-8 text-3xl text-center'>
                    Admin Page
                </h1>

                <div className='flex justify-center gap-10'>
                    <button className='px-4 py-2 bg-blue-500 text-white rounded' onClick={handleAddProduct}>
                        Add Product
                    </button>
                    <div className={`fixed top-0 left-0 w-full h-full z-40 flex items-center justify-center bg-gray-800 bg-opacity-50 transition-all ${showProductModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setShowProductModal(false)}>
                        <ProductModal setShow={setShowProductModal} editingProduct={editingProduct} />
                    </div>

                    <button className='px-4 py-2 bg-blue-500 text-white rounded' onClick={() => setShowTagModal(true)}>
                        Edit Tags
                    </button>
                    <div className={`fixed top-0 left-0 w-full h-full z-40 flex items-center justify-center bg-gray-800 bg-opacity-50 transition-all ${showTagModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setShowTagModal(false)}>
                        <TagModal setShow={setShowTagModal} />
                    </div>

                    <button className='px-4 py-2 bg-blue-500 text-white rounded' onClick={() => setShowUserModal(true)}>
                        Manage Users
                    </button>
                    <div className={`fixed top-0 left-0 w-full h-full z-40 flex items-center justify-center bg-gray-800 bg-opacity-50 transition-all ${showUserModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setShowUserModal(false)}>
                        <UserModal setShow={setShowUserModal} />
                    </div>
                </div>

                <h1 className='m-8 text-3xl text-center'>
                    <button onClick={() => setShrinkOrders(!shrinkOrders)}>
                        Orders
                    </button>
                </h1>
                <div className={`overflow-clip ${shrinkOrders && 'h-0'}`}>
                    <OrderTable />
                </div>

                <hr className='w-1/2 mx-auto my-8 border-black' />

                <h1 className='m-8 text-3xl text-center'>
                    <button onClick={() => setShrinkProducts(!shrinkProducts)}>
                        Products
                    </button>
                </h1>
                <div className={`overflow-clip ${shrinkProducts && 'h-0'}`}>
                    <ProductTable setShow={setShowProductModal} setEditingProduct={setEditingProduct} />
                </div>
            </div>
        </MainLayout>
    )
}
export default AdminPage