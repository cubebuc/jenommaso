import { Link } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import beef from '../assets/beef-tenderloin.jpg'
import chicken from '../assets/roasted-chicken.jpg'

type Props = {}
function HomePage({ }: Props)
{
    return (
        <MainLayout>
            <div>
                <img className='h-screen w-full object-cover' src={beef} alt='beef tenderloin' />

                <div className='absolute inset-0 flex flex-col items-center justify-center'>
                    <h1 className='text-8xl text-center text-white'>Jiřího</h1>
                    <h1 className='text-8xl text-center text-white'>Dobroty</h1>

                    <Link className='mt-32 px-4 py-2 text-white border border-white border-2 text-xl hover:bg-white hover:text-stone-600 transition-all duration-400' to='/shop'>
                        Nabídka
                    </Link>
                </div>
            </div>
            <img className='h-screen w-full object-cover' src={chicken} alt='roasted chicken' />
        </MainLayout>
    )
}
export default HomePage