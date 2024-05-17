import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { signUp } from '../utils/firebase'

type Props = {}
function RegisterPage({ }: Props)
{
    const navigate = useNavigate()

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

        navigate('/')
    }

    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <h1 className='mb-5 text-5xl'>Registrace</h1>
            <form className='flex flex-col items-centers justify-center' onSubmit={handleSubmit}>
                <label htmlFor='name'>Jméno:</label>
                <input className='mb-3 p-2 border border-gray-400' id='name' type='text' placeholder='Jméno' required />
                <label htmlFor='email'>Email:</label>
                <input className='mb-3 p-2 border border-gray-400' id='email' type='email' placeholder='Email' required />
                <label htmlFor='password'>Heslo: {passwordTooShort() && <span className='absolute ml-1 text-red-500'>too short</span>}</label>
                <input className={`mb-3 p-2 border border-gray-400 ${passwordTooShort() && 'bg-red-100'}`} id='password' type='password' placeholder='Heslo' required onChange={e => setPassword(e.target.value)} />
                <label htmlFor='confirm-password'>Heslo znovu:{!passwordsMatch() && <span className='absolute ml-1 text-red-500'>does not match</span>}</label>
                <input className={`mb-3 p-2 border border-gray-400 ${!passwordsMatch() && 'bg-red-100'}`} id='confirm-password' type='password' placeholder='Heslo znovu' required onChange={e => setConfirmPassword(e.target.value)} />
                <label htmlFor='phone'>Telefon: (formát: 123 456 789)</label>
                <input className='mb-4 p-2 border border-gray-400' id='phone' type='tel' placeholder='Telefon' pattern='[0-9]{3} [0-9]{3} [0-9]{3}' required />
                <label htmlFor='address'>Adresa:</label>
                <input className='mb-4 p-2 border border-gray-400' id='address' type='text' placeholder='Adresa' required />
                <button type='submit' className='p-2 bg-blue-500 text-white rounded'>Registrovat</button>
            </form>
        </div>
    )
}
export default RegisterPage