import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { signOut } from '../utils/firebase'
import { Context } from '../contexts/AuthContext'

type Props = {}
function Navbar({ }: Props)
{
    const { admin } = useContext(Context)

    return (
        <header className='fixed top-0 w-full z-30 flex flex-row items-center p-3 bg-stone-600 text-white'>
            <Link className='w-1/3 ps-20 text-xl' to='/home'>Jiřího Dobroty</Link>

            <nav className='grow'>
                <ul className='flex justify-center gap-6'>
                    <li><Link to='/home'>Úvod</Link></li>
                    <li><Link to='/shop'>Nabídka</Link></li>
                </ul>
            </nav>

            <div className='w-1/3 pe-20 flex items-center justify-end gap-6'>
                {admin && <Link className='text-blue-400' to='/admin'>Admin</Link>}
                <Link to='/profile'>Profil</Link>
                <Link to='/cart'>Košík</Link>
                <button onClick={signOut}>Odhlásit</button>
            </div>
        </header>
    )
}
export default Navbar