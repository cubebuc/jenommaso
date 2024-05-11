import Header from "../components/Header"

type Props = { children: React.ReactNode }
function MainLayout({ children }: Props)
{
    return (
        <div>
            <Header />
            {children}
        </div>
    )
}
export default MainLayout