import MainLayout from '../layouts/MainLayout'

type Props = {}
function ProfilePage({ }: Props)
{
    return (
        <MainLayout>
            <h1 className='mt-24 mb-8 text-3xl text-center'>
                Profile Page
            </h1>
        </MainLayout>
    )
}
export default ProfilePage