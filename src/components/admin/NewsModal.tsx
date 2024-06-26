import { addNews as addNewsFirebase, removeNews as removeNewsFirebase } from "../../utils/firebase"
import { useGlobal } from "../../contexts/GlobalContext"
import { addNews as addNewsAction, removeNews as removeNewsAction } from "../../contexts/Actions"

type Props = { setShow: React.Dispatch<React.SetStateAction<boolean>> }
function NewsModal({ setShow }: Props)
{
    const { state, dispatch } = useGlobal()
    const news = state.news

    async function addNews(e: React.FormEvent<HTMLFormElement>)
    {
        e.preventDefault()
        const form = e.currentTarget as HTMLFormElement
        const title = form.querySelector('input')?.value
        const content = form.querySelector('textarea')?.value

        if (title && content)
        {
            const { id, news } = await addNewsFirebase(title, content)
            dispatch(addNewsAction(id, news))
        }
    }

    function removeNews(id: string)
    {
        removeNewsFirebase(id).then(() => dispatch(removeNewsAction(id)))
    }

    return (
        <div className='overflow-auto max-h-full w-11/12 sm:w-5/6 md:w-2/3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded shadow-lg' onClick={e => e.stopPropagation()}>
            <div className='ml-2 mb-5 flex justify-between'>
                <h1 className='text-3xl underline font-playfair'>
                    Novinky
                </h1>
                <button className='px-4 py-2 bg-red-500 text-white rounded hover:scale-105 active:scale-95 transition-transform' onClick={() => setShow(false)}>
                    Zavřít
                </button>
            </div>

            <form className='mb-2 flex flex-col' onSubmit={addNews}>
                <input className='m-2 px-2 py-1 border border-gray-400 rounded' type='text' placeholder='Název' required />
                <textarea className='h-28 m-2 px-2 py-1 border border-gray-400 rounded' placeholder='Text' required />
                <button className='w-20 m-2 px-4 py-2 bg-blue-500 text-white rounded hover:scale-105 active:scale-95 transition-transform' type='submit'>
                    Add
                </button>
            </form>
            <div className='mb-2'>
                {Object.entries(news).sort((a, b) => b[1].date - a[1].date).map(([id, news]) =>
                    <div key={id} className='relative flex flex-col justify-between items-center p-3 odd:bg-gray-100 even:bg-gray-200'>
                        <p className='-mb-1 text-sm text-stone-500'>{news.date.toDate().toLocaleDateString()}</p>
                        <h1 className='text-center text-xl font-playfair'>{news.title}</h1>
                        <p className='mt-2 whitespace-pre-line text-center'>
                            {news.content}
                        </p>
                        <button className='top-3 right-3 absolute px-2 py-1 bg-red-500 text-white rounded hover:scale-105 active:scale-95 transition-transform' onClick={() => removeNews(id)}>
                            Remove
                        </button>
                    </div>
                )}
            </div>

            <button className='m-4 mb-2 px-4 py-2 bg-red-500 text-white rounded hover:scale-105 active:scale-95 transition-transform' onClick={() => setShow(false)}>
                Zavřít
            </button>
        </div>
    )
}
export default NewsModal