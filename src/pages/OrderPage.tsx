import MainLayout from "../layouts/MainLayout"

type Props = {}
function OrderPage({ }: Props)
{
    return (
        <MainLayout>
            <div className="flex justify-center items-center h-screen">
                <h1 className="text-4xl">Order Page</h1>
            </div>
        </MainLayout>
    )
}
export default OrderPage