import { useState, useEffect } from 'react'
import { getUsersWithRights, setUserVerified } from '../utils/firebase'

type Props = { setShow: React.Dispatch<React.SetStateAction<boolean>> }
function UserModal({ setShow }: Props)
{
    const [users, setUsers] = useState<{ [key: string]: any }>({})

    useEffect(() =>
    {
        getUsersWithRights().then(setUsers)
    }, [])

    async function handleSetVerified(id: string, verified: boolean)
    {
        const success = await setUserVerified(id, verified)
        if (success)
            setUsers({ ...users, [id]: { ...users[id], verified } })
    }

    return (
        <div className='w-11/12 sm:w-5/6 md:w-2/3 lg:w-1/2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded shadow-lg' onClick={e => e.stopPropagation()}>
            <h1 className='ml-2 mb-3 text-3xl font-bold underline'>
                Manage Users
            </h1>

            <div className='overflow-y-auto'>
                {Object.entries(users).filter(([, user]) => !user.admin).map(([id, user]) =>
                    <div key={id} className='flex justify-between p-2 odd:bg-gray-100 even:bg-gray-200'>
                        <p className='ml-1'>{user.name}</p>
                        <div className='flex pl-2 mr-1'>
                            <p className='mr-2'>Verified:</p>
                            <input className='w-5' type='checkbox' checked={user.verified} onChange={e => handleSetVerified(id, e.target.checked)} />
                        </div>
                    </div>
                )}
            </div>

            <button className='m-4 px-4 py-2 bg-blue-500 text-white rounded' onClick={() => setShow(false)}>
                Close
            </button>
        </div>
    )
}
export default UserModal