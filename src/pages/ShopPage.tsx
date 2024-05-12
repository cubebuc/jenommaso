import { useState, useEffect } from 'react'
import MainLayout from '../layouts/MainLayout'
import ShopItem from '../components/shop/ShopItem'
import { getProducts, getTags } from '../utils/firebase'

type Props = {}
function ShopPage({ }: Props)
{
    const [products, setProducts] = useState<{ [key: string]: any }>({})
    const [tags, setTags] = useState<{ [key: string]: any }>({})

    useEffect(() =>
    {
        getProducts().then(setProducts)
        getTags().then(setTags)
    }, [])

    return (
        <MainLayout>
            <h1 className='mt-24 mb-8 text-3xl text-center'>
                Shop Page
            </h1>
            <div className='flex justify-center'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                    {Object.keys(products).map((key) =>
                    {
                        return <ShopItem key={key} product={products[key]} />
                    })}
                </div>
            </div>
        </MainLayout>
    )
}
export default ShopPage