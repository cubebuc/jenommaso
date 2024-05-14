import MainLayout from "../layouts/MainLayout"

type Props = {}
function OrderPage({ }: Props)
{
    return (
        <MainLayout>
            <div className="flex justify-center items-center h-screen">
                <div className='w-96 h-96 flex justify-center items-center bg-amber-500 rounded-full'>
                    <h1 className="text-4xl">Objednávka přijata</h1>
                </div>
            </div>
        </MainLayout>
    )
}
export default OrderPage