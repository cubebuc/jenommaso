import { useState } from 'react'
import { Link } from 'react-router-dom'
import { signOut } from '../utils/firebase'
import { useGlobal } from '../contexts/GlobalContext'

type Props = {}
function Navbar({ }: Props)
{
    const [showMenu, setShowMenu] = useState(false)

    const { admin } = useGlobal().state

    return (
        <div>
            <button className='md:invisible fixed top-0 right-0 z-40 p-3 m-2 text-white bg-stone-600 rounded' onClick={() => setShowMenu(!showMenu)}>
                <svg viewBox='0 0 10 8' width='50'>
                    <path d='M1 1h8M1 4h 8M1 7h8'
                        stroke-width='1'
                        stroke-linecap='round'
                        stroke='currentColor' />
                </svg>
            </button>
            <header className={`transition-all ${!showMenu && 'invisible opacity-0'} md:visible md:opacity-100 fixed top-0 w-full z-30 flex flex-col md:flex-row justify-between items-center p-3 bg-stone-600 text-white gap-2 md:gap-0`}>
                <Link className='hidden md:block invisible md:visible w-full md:w-1/3 md:ps-20 text-xl text-center md:text-left' to='/home'>Jiřího Dobroty</Link>

                <nav className='w-full md:w-1/3 my-3 md:my-0 '>
                    <ul className='flex flex-col md:flex-row items-center justify-center gap-6 text-2xl md:text-base'>
                        <li><Link to='/home'>Úvod</Link></li>
                        <li><Link to='/shop'>Nabídka</Link></li>
                    </ul>
                </nav>

                <hr className='w-full md:hidden' />

                <div className='w-full md:w-1/3 my-3 md:my-0 md:pe-20 flex flex-col md:flex-row justify-center items-center justify-end gap-6 text-2xl md:text-base'>
                    {admin && <Link className='text-blue-400' to='/admin'>Admin</Link>}
                    <Link to='/profile'>Profil</Link>
                    <Link to='/cart'>Košík</Link>
                    <button onClick={signOut}>Odhlásit</button>
                </div>
            </header>
        </div>
    )
}
export default Navbar