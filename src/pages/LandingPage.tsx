import { useState } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { useGlobal } from '../contexts/GlobalContext'
import { signIn } from '../utils/firebase'

type Props = {}
function LandingPage({ }: Props)
{
    const { verified, admin } = useGlobal().state

    const [loginFailed, setLoginFailed] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>)
    {
        e.preventDefault()
        const email = (document.getElementById('email') as HTMLInputElement).value
        const password = (document.getElementById('password') as HTMLInputElement).value
        if (!await signIn(email, password))
            setLoginFailed(true)
        else
            navigate('/home')
    }

    if (verified || admin)
        return <Navigate to='/home' replace />
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <h1 className='mb-5 text-5xl'>Welcome</h1>
            <form className='flex flex-col items-center justify-center gap-3' onSubmit={handleSubmit}>
                <input className='border border-gray-400 p-2' id='email' type='text' placeholder='Email' />
                <input className='border border-gray-400 p-2' id='password' type='password' placeholder='Password' />
                <div className='flex flex-row items-center justify-center gap-3'>
                    <button className='border border-gray-400 p-2' type='submit'>Login</button>
                    <Link className='border border-gray-400 p-2' to='/register'>Register</Link>
                </div>
            </form>
            {loginFailed && <p className='mt-3 text-red-500'>Login failed</p>}
        </div>
    )
}
export default LandingPage