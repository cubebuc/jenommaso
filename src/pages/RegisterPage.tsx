import { useState } from 'react'
import { signUp } from '../utils/firebase'

type Props = {}
function RegisterPage({ }: Props)
{
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    function passwordTooShort()
    {
        return password.length > 0 && password.length < 6
    }

    function passwordsMatch()
    {
        return password === confirmPassword
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>)
    {
        e.preventDefault()
        const name = (document.getElementById('name') as HTMLInputElement).value
        const email = (document.getElementById('email') as HTMLInputElement).value
        const phone = (document.getElementById('phone') as HTMLInputElement).value
        const address = (document.getElementById('address') as HTMLInputElement).value

        if (passwordTooShort() || !passwordsMatch())
            return

        await signUp(email, password, name, phone, address)
    }

    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <h1 className='mb-5 text-5xl'>Register</h1>
            <form className='flex flex-col items-centers justify-center' onSubmit={handleSubmit}>
                <label htmlFor='name'>Name:</label>
                <input className='mb-3 p-2 border border-gray-400' id='name' type='text' placeholder='Name' required />
                <label htmlFor='email'>Email:</label>
                <input className='mb-3 p-2 border border-gray-400' id='email' type='email' placeholder='Email' required />
                <label htmlFor='password'>Password: {passwordTooShort() && <span className='absolute ml-1 text-red-500'>too short</span>}</label>
                <input className={`mb-3 p-2 border border-gray-400 ${passwordTooShort() && 'bg-red-100'}`} id='password' type='password' placeholder='Password' required onChange={e => setPassword(e.target.value)} />
                <label htmlFor='confirm-password'>Confirm Password:{!passwordsMatch() && <span className='absolute ml-1 text-red-500'>does not match</span>}</label>
                <input className={`mb-3 p-2 border border-gray-400 ${!passwordsMatch() && 'bg-red-100'}`} id='confirm-password' type='password' placeholder='Confirm Password' required onChange={e => setConfirmPassword(e.target.value)} />
                <label htmlFor='phone'>Phone:</label>
                <input className='mb-4 p-2 border border-gray-400' id='phone' type='tel' placeholder='Phone' required />
                <label htmlFor='address'>Address:</label>
                <input className='mb-4 p-2 border border-gray-400' id='address' type='text' placeholder='Address' required />
                <button type='submit' className='p-2 bg-blue-500 text-white rounded'>Register</button>
            </form>
        </div>
    )
}
export default RegisterPage