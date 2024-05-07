import { useState, useEffect } from 'react'

import ProductModal from '../components/ProductModal'
import TagModal from '../components/TagModal'
import UserModal from '../components/UserModal'
import ProductTable from '../components/ProductTable'
import { getProducts, getTags } from '../utils/firebase'

type Props = {}
function AdminPage({ }: Props)
{
    const [showProductModal, setShowProductModal] = useState(false)
    const [showTagModal, setShowTagModal] = useState(false)
    const [showUserModal, setShowUserModal] = useState(false)
    const [products, setProducts] = useState<{ [key: string]: any }>({})
    const [editingProduct, setEditingProduct] = useState<{ [key: string]: any }>({})
    const [tags, setTags] = useState<{ [key: string]: string[] }>({})

    useEffect(() =>
    {
        getProducts().then(products => setProducts(products))
        getTags().then(tags => setTags(tags))
    }, [])

    function handleAddProduct()
    {
        setEditingProduct({})
        setShowProductModal(true)
    }

    return (
        <>
            <h1 className='m-8 text-3xl text-center'>
                Admin Page
            </h1>

            <div className='flex justify-center gap-10'>
                <button className='px-4 py-2 bg-blue-500 text-white rounded' onClick={handleAddProduct}>
                    Add Product
                </button>
                <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 transition-all ${showProductModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setShowProductModal(false)}>
                    <ProductModal setShow={setShowProductModal} setProducts={setProducts} tags={tags} editingProduct={editingProduct} />
                </div>

                <button className='px-4 py-2 bg-blue-500 text-white rounded' onClick={() => setShowTagModal(true)}>
                    Edit Tags
                </button>
                <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 transition-all ${showTagModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setShowTagModal(false)}>
                    <TagModal setShow={setShowTagModal} setTags={setTags} tags={tags} products={products} />
                </div>

                <button className='px-4 py-2 bg-blue-500 text-white rounded' onClick={() => setShowUserModal(true)}>
                    Manage Users
                </button>
                <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 transition-all ${showUserModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setShowUserModal(false)}>
                    <UserModal setShow={setShowUserModal} />
                </div>
            </div>


            <h1 className='m-8 text-3xl text-center'>
                Products
            </h1>
            <ProductTable setShow={setShowProductModal} products={products} setProducts={setProducts} setEditingProduct={setEditingProduct} />
        </>
    )
}
export default AdminPage