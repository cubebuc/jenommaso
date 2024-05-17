import Header from "../components/Header"
import Footer from "../components/Footer"

type Props = { children: React.ReactNode }
function MainLayout({ children }: Props)
{
    return (
        <div className='flex flex-col min-h-screen'>
            <Header />
            {children}
            <div className='flex flex-col justify-end grow'>
                <Footer />
            </div>
        </div>
    )
}
export default MainLayout