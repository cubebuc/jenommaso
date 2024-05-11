import MainLayout from '../layouts/MainLayout'

type Props = {}
function HomePage({ }: Props)
{
    return (
        <MainLayout>
            <h1 className='m-10 text-5xl text-center'>Home Page</h1>
        </MainLayout>
    )
}
export default HomePage