import { setUserVerified as setUserVerifiedFirebase } from '../../utils/firebase'
import { useGlobal } from '../../contexts/GlobalContext'
import { setUserVerified as setUserVerifiedAction } from '../../contexts/Actions'

type Props = { setShow: React.Dispatch<React.SetStateAction<boolean>> }
function UserModal({ setShow }: Props)
{
    const { state, dispatch } = useGlobal()
    const users = state.usersWithRights

    async function handleSetVerified(id: string, verified: boolean)
    {
        const success = await setUserVerifiedFirebase(id, verified)
        if (success)
            dispatch(setUserVerifiedAction(id, verified))
    }

    return (
        <div className='overflow-auto max-h-screen w-11/12 sm:w-5/6 md:w-2/3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded shadow-lg' onClick={e => e.stopPropagation()}>
            <div className='ml-2 mb-5 flex justify-between'>
                <h1 className='text-3xl underline font-playfair'>
                    Uživatelé
                </h1>
                <button className='px-4 py-2 bg-red-500 text-white rounded hover:scale-105 active:scale-95 transition-transform' onClick={() => setShow(false)}>
                    Zavřít
                </button>
            </div>

            <div>
                {Object.entries(users).filter(([, user]) => !user.admin).map(([id, user]) =>
                    <div key={id} className='flex justify-between items-center p-2 px-3 odd:bg-gray-100 even:bg-gray-200'>
                        <div className='w-full flex justify-between items-center flex-wrap'>
                            <p className='w-1/4 min-w-fit pe-4'>{user.name}</p>
                            <p className='w-1/4 min-w-fit pe-4'>{user.email}</p>
                            <p className='w-1/4 min-w-fit pe-4'>{user.phone}</p>
                            <p className='w-1/4 min-w-fit pe-4'>{user.address}</p>
                        </div>
                        <div className='flex'>
                            <p className='mr-2'>Ověřen:</p>
                            <input className='w-5' type='checkbox' defaultChecked={user.verified} onChange={e => handleSetVerified(id, e.target.checked)} />
                        </div>
                    </div>
                )}
            </div>

            <button className='m-4 mt-6 mb-2 px-4 py-2 bg-red-500 text-white rounded hover:scale-105 active:scale-95 transition-transform' onClick={() => setShow(false)}>
                Zavřít
            </button>
        </div>
    )
}
export default UserModal