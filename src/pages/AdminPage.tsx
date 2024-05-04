import { useState, useEffect } from 'react'

import ProductModal from '../components/ProductModal'
import TagModal from '../components/TagModal'
import ProductTable from '../components/ProductTable'
import { getProducts, getTags } from '../utils/firebase'

type Props = {}
function AdminPage({ }: Props)
{
    const [showProductModal, setShowProductModal] = useState(false)
    const [showTagModal, setShowTagModal] = useState(false)
    const [products, setProducts] = useState<{ [key: string]: any }>({})
    const [tags, setTags] = useState<{ [key: string]: string[] }>({})

    useEffect(() =>
    {
        getProducts().then(products => setProducts(products))
        getTags().then(tags => setTags(tags))
    }, [])

    return (
        <>
            <h1 className='m-8 text-3xl text-center'>
                Admin Page
            </h1>

            <button className='m-8 px-4 py-2 bg-blue-500 text-white rounded' onClick={() => setShowProductModal(true)}>
                Add Product
            </button>
            <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 transition-all ${showProductModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setShowProductModal(false)}>
                <ProductModal setShow={setShowProductModal} setProducts={setProducts} tags={tags} />
            </div>

            <button className='m-8 px-4 py-2 bg-blue-500 text-white rounded' onClick={() => setShowTagModal(true)}>
                Tags
            </button>
            <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 transition-all ${showTagModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setShowTagModal(false)}>
                <TagModal setShow={setShowTagModal} setTags={setTags} tags={tags} />
            </div>


            <h1 className='m-8 text-3xl text-center'>
                Products
            </h1>
            <ProductTable products={products} setProducts={setProducts} />
        </>
    )
}
export default AdminPage