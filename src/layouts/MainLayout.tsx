import Header from "../components/Header"
import Footer from "../components/Footer"

type Props = { children: React.ReactNode }
function MainLayout({ children }: Props)
{
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    )
}
export default MainLayout