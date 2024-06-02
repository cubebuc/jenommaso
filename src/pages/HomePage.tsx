import { Link } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import NewsShowcase from '../components/NewsShowcase'
import ContactSection from '../components/ContactSection'
import beef from '../assets/beef-tenderloin.jpg'
import chicken from '../assets/roasted-chicken.jpg'

type Props = {}
function HomePage({ }: Props)
{
    return (
        <MainLayout>
            <title>Jiřího Dobroty | Domů</title>
            <div>
                <img className='h-screen w-full object-cover' src={beef} alt='beef tenderloin' />

                <div className='absolute inset-0 flex flex-col items-center justify-center'>
                    <h1 className='text-6xl md:text-8xl text-center text-white font-playfair uppercase'>Jiřího</h1>
                    <hr className='w-60 bg-white mt-2' />
                    <h1 className='-mt-1 text-6xl md:text-8xl text-center text-white font-playfair uppercase'>Dobroty</h1>

                    <Link className='mt-32 px-4 py-2 text-white border border-white border-2 text-xl hover:bg-white hover:text-stone-600 transition-all duration-400 uppercase' to='/shop'>
                        Jiřího Nabídka
                    </Link>
                </div>
            </div>
            <NewsShowcase />
            <div className='relative'>
                <img className='h-96 w-full object-cover' src={chicken} alt='roasted chicken' />

                <div className='absolute inset-0 flex flex-col items-center justify-center'>
                    <h1 className='w-11/12 lg:w-2/3 text-3xl lg:text-6xl text-center text-white font-cinzel uppercase'>
                        “objev nového jídla
                        znamená pro štěstí lidské rasy
                        víc než objev hvězdy.”
                    </h1>
                    <p className='mt-5 text-xl text-white'>- Anthelme Brillat-Savarin -</p>
                </div>
            </div>
            <ContactSection />
        </MainLayout>
    )
}
export default HomePage