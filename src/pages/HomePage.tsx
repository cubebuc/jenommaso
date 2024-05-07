import { signOut } from '../utils/firebase'

type Props = {}
function HomePage({ }: Props)
{
    return (
        <div>
            <h1 className='m-10 text-5xl text-center'>Home Page</h1>
            <div className='flex flex-row items-center justify-center gap-3'>
                <button onClick={signOut} className='p-2 bg-red-500 text-white rounded'>Sign Out</button>
            </div>
        </div>
    )
}
export default HomePage