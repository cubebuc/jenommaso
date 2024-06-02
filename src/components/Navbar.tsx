import { useState } from 'react'
import { HashLink as Link } from 'react-router-hash-link'
import { signOut } from '../utils/firebase'
import { useGlobal } from '../contexts/GlobalContext'
import { clearCart } from '../contexts/Actions'

type Props = {}
function Navbar({ }: Props)
{
    const [showMenu, setShowMenu] = useState(false)

    const { state, dispatch } = useGlobal()
    const { admin, cart } = state

    function cartSize()
    {
        return Object.values(cart).reduce((acc, val) => acc + val, 0)
    }

    function handleSignOut()
    {
        dispatch(clearCart())
        localStorage.removeItem('cart')
        signOut()
    }

    function scrollWithOffset(el: HTMLElement)
    {
        const yCoordinate = el.getBoundingClientRect().top + window.scrollY;
        let yOffset = -50;
        // if on phone, scroll to the top of the element
        if (window.innerWidth < 768)
            yOffset = 0
        window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
    }

    return (
        <div>
            <button className='md:invisible fixed top-0 right-0 z-40 p-3 m-2 text-white bg-stone-600 rounded hover:scale-105 active:scale-95 transition-transform' onClick={() => setShowMenu(!showMenu)}>
                <svg viewBox='0 0 10 8' width='50'>
                    <path d='M1 1h8M1 4h 8M1 7h8'
                        strokeWidth='1'
                        strokeLinecap='round'
                        stroke='currentColor' />
                </svg>
                <span className='absolute size-9 -ms-6 -mt-4 flex justify-center items-center bg-amber-600 rounded-full'>{cartSize()}</span>
            </button>

            <header className={`transition-all ${!showMenu && 'invisible opacity-0'} md:visible md:opacity-100 fixed top-0 w-full z-30 flex flex-col md:flex-row justify-between items-center p-3 bg-stone-600 text-white gap-2 md:gap-0`}>
                <Link className='hidden md:block invisible md:visible w-full md:w-fit lg:w-1/3 lg:ps-[3%] text-xl' to='/home'>
                    <h1 className='w-fit h-fit hover:scale-105 active:scale-95 transition-transform translate-y-0.5 uppercase'>
                        Jiřího Dobroty
                    </h1>
                </Link>

                <nav className='w-full lg:w-1/3 my-3 md:my-0 '>
                    <ul className='flex flex-col md:flex-row items-center justify-center gap-8 text-2xl md:text-base'>
                        <li className='hover:scale-105 active:scale-95 transition-transform translate-y-0.5 uppercase' onClick={() => setShowMenu(false)}>
                            <Link smooth to='/home#'>Úvod</Link>
                        </li>
                        <li className='hover:scale-105 active:scale-95 transition-transform translate-y-0.5 uppercase text-nowrap' onClick={() => setShowMenu(false)}>
                            <Link smooth to='/shop#'>Jiřího Nabídka</Link>
                        </li>
                        <li className='hover:scale-105 active:scale-95 transition-transform translate-y-0.5 uppercase' onClick={() => setShowMenu(false)}>
                            <Link smooth to='/home#news' scroll={scrollWithOffset}>Novinky</Link>
                        </li>
                        <li className='hover:scale-105 active:scale-95 transition-transform translate-y-0.5 uppercase' onClick={() => setShowMenu(false)}>
                            <Link smooth to='/home#contact' scroll={scrollWithOffset}>Kontakt</Link>
                        </li>
                    </ul>
                </nav>

                <hr className='w-full md:hidden' />

                <div className='w-full md:w-fit lg:w-1/3 my-3 md:my-0 lg:pe-[3%] flex flex-col md:flex-row md:justify-end items-center justify-end gap-6 text-2xl md:text-base translate-y-0.5'>
                    {admin && <Link className='text-blue-400 hover:scale-105 active:scale-95 transition-transform' to='/admin#'>Admin</Link>}
                    <Link className='hover:scale-105 active:scale-95 transition-transform' to='/profile#'>Profil</Link>
                    <Link className='hover:scale-105 active:scale-95 transition-transform flex justify-center' to='/cart#'>
                        Košík
                        <span className='invisible md:visible absolute size-7 mt-6 flex justify-center items-center bg-amber-600 rounded-full'>{cartSize()}</span>
                    </Link>
                    <button className='hover:scale-105 active:scale-95 transition-transform' onClick={handleSignOut}>Odhlásit</button>
                </div>
            </header>
        </div >
    )
}
export default Navbar