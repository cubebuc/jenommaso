import MainLayout from "../layouts/MainLayout"
import ShopItem from "../components/shop/ShopItem"

type Props = {}
function ShopPage({ }: Props)
{
    return (
        <MainLayout>
            <h1 className='m-8 text-3xl text-center'>
                Shop Page
            </h1>
            <div className='flex justify-center'>
                <div className='w-3/4 flex flex-wrap justify-center'>
                    <ShopItem />
                    <ShopItem />
                    <ShopItem />
                    <ShopItem />
                    <ShopItem />
                    <ShopItem />
                    <ShopItem />
                    <ShopItem />
                    <ShopItem />
                </div>
            </div>
        </MainLayout>
    )
}
export default ShopPage