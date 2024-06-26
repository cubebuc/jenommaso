import { useState } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { useGlobal } from '../contexts/GlobalContext'
import { signIn } from '../utils/firebase'

type Props = {}
function LandingPage({ }: Props)
{
    const { verified, admin } = useGlobal().state

    const [loginFailed, setLoginFailed] = useState(<></>)
    const navigate = useNavigate()

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>)
    {
        e.preventDefault()

        const email = (document.getElementById('email') as HTMLInputElement).value
        const password = (document.getElementById('password') as HTMLInputElement).value

        const result = await signIn(email, password)
        if (result === 2)
            setLoginFailed(<>Špatné přihlašovací údaje</>)
        else if (result === 1)
            setLoginFailed(<>Účet není ověřen<br />Požádejte o ověření administrátora</>)
        else
        {
            setLoginFailed(<></>)
            navigate('/home')
        }
    }

    if (verified || admin)
        return <Navigate to='/home' replace />
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <title>Jiřího Dobroty | Přihlášení</title>
            <h1 className='mb-5 text-5xl font-playfair'>Vítej</h1>
            <form className='flex flex-col items-center justify-center gap-3' onSubmit={handleSubmit}>
                <input className='border border-gray-400 p-2' id='email' type='text' placeholder='Email' />
                <input className='border border-gray-400 p-2' id='password' type='password' placeholder='Password' />
                <div className='flex flex-row items-center justify-center gap-3'>
                    <button className='border border-gray-400 p-2 hover:scale-105 transition-transform' type='submit'>Přihlásit</button>
                    <Link className='border border-gray-400 p-2 hover:scale-105 transition-transform' to='/register'>Registrovat</Link>
                </div>
            </form>
            {loginFailed && <p className='mt-3 text-red-500 text-center'>{loginFailed}</p>}
        </div>
    )
}
export default LandingPage