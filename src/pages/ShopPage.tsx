import MainLayout from '../layouts/MainLayout'
import ShopItem from '../components/shop/ShopItem'
import { useGlobal } from '../contexts/GlobalContext'

type Props = {}
function ShopPage({ }: Props)
{
    const { products } = useGlobal().state

    return (
        <MainLayout>
            <h1 className='mt-24 mb-8 text-3xl text-center'>
                Shop Page
            </h1>
            <div className='flex justify-center'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                    {Object.entries(products).map(([id, product]) =>
                        !product.hidden &&
                        <ShopItem key={id} id={id} product={product} />
                    )}
                </div>
            </div>
        </MainLayout>
    )
}
export default ShopPage