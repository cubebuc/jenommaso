import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { signOut } from '../utils/firebase'
import { Context } from '../contexts/AuthContext'

type Props = {}
function Navbar({ }: Props)
{
    const { admin } = useContext(Context)

    return (
        <header className='flex flex-row items-center p-3 bg-stone-600 text-white'>
            <Link className='w-40 text-xl text-center' to='/home'>Jiřího Dobroty</Link>

            <nav className='grow'>
                <ul className='flex justify-center gap-6'>
                    <li><Link to='/home'>Úvod</Link></li>
                    <li><Link to='/shop'>Nabídka</Link></li>
                </ul>
            </nav>

            <div className='w-40 flex items-center justify-center gap-6'>
                {admin && <Link className='text-blue-400' to='/admin'>Admin</Link>}
                <button onClick={signOut}>Sign Out</button>
            </div>
        </header>
    )
}
export default Navbar