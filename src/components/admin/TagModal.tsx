import { addTag as addTagFirebase, deleteTag } from '../../utils/firebase'
import { useGlobal } from '../../contexts/GlobalContext'
import { addTag as addTagAction, removeTag } from '../../contexts/Actions'

type Props = { setShow: React.Dispatch<React.SetStateAction<boolean>> }
function TagModal({ setShow }: Props)
{
    const { state, dispatch } = useGlobal()
    const { tags, products } = state

    async function handleAddTag(e: React.FormEvent<HTMLFormElement>, type: string)
    {
        e.preventDefault()
        const form = e.currentTarget
        const tag = (form[0] as any).value
        form.reset()

        if (tags[type].includes(tag) || tag === '') return

        await addTagFirebase(type, tag)
        dispatch(addTagAction(type, tag))
    }

    async function handleDeleteTag(type: string, tag: string)
    {
        if (Object.values(products).some(product => product[type].includes(tag))) return

        await deleteTag(type, tag)
        dispatch(removeTag(type, tag))
    }

    return (
        <div className='w-11/12 sm:w-5/6 md:w-2/3 lg:w-1/2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded shadow-lg' onClick={e => e.stopPropagation()}>
            <h1 className='ml-2 mb-3 text-3xl underline font-playfair'>
                Štítky
            </h1>
            <div className='mt-2'>
                <h2 className='mb-3 text-xl'>
                    Kategorie
                </h2>
                <form className='flex items-center mb-3' onSubmit={e => handleAddTag(e, 'category')}>
                    <input className='border px-4 py-2' type='text' placeholder='Add Category' />
                    <button className='px-4 py-2 bg-blue-500 text-white rounded ml-2 hover:scale-105 active:scale-95 transition-transform'>
                        Přidat
                    </button>
                </form>
                <div className='flex flex-wrap gap-1'>
                    {
                        tags.category?.map((category, index) => (
                            <div key={index} className='px-3 py-0.5 border rounded-full'>
                                {category}
                                <button className='pl-2 text-gray-600' onClick={() => handleDeleteTag('category', category)}>
                                    ×
                                </button>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='mt-4'>
                <h2 className='mb-2 text-xl'>
                    Úprava
                </h2>
                <form className='flex items-center mb-3' onSubmit={e => handleAddTag(e, 'treatment')}>
                    <input className='border px-4 py-2' type='text' placeholder='Add Treatment' />
                    <button className='px-4 py-2 bg-blue-500 text-white rounded ml-2 hover:scale-105 active:scale-95 transition-transform'>
                        Přidat
                    </button>
                </form>
                <div className='flex flex-wrap gap-1'>
                    {
                        tags.treatment?.map((treatment, index) => (
                            <div key={index} className='px-3 py-0.5 border rounded-full'>
                                {treatment}
                                <button className='pl-2 text-gray-600' onClick={() => handleDeleteTag('treatment', treatment)}>
                                    ×
                                </button>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='mt-4'>
                <h2 className='mb-2 text-xl'>
                    Využití
                </h2>
                <form className='flex items-center mb-3' onSubmit={e => handleAddTag(e, 'usage')}>
                    <input className='border px-4 py-2' type='text' placeholder='Add Usage' />
                    <button className='px-4 py-2 bg-blue-500 text-white rounded ml-2 hover:scale-105 active:scale-95 transition-transform'>
                        Přidat
                    </button>
                </form>
                <div className='flex flex-wrap gap-1'>
                    {
                        tags.usage?.map((usage, index) => (
                            <div key={index} className='px-3 py-0.5 border rounded-full'>
                                {usage}
                                <button className='pl-2 text-gray-600' onClick={() => handleDeleteTag('usage', usage)}>
                                    ×
                                </button>
                            </div>
                        ))
                    }
                </div>
            </div>
            <button className='m-4 px-4 py-2 bg-blue-500 text-white rounded hover:scale-105 active:scale-95 transition-transform' onClick={() => setShow(false)}>
                Zavřit
            </button>
        </div>
    )
}
export default TagModal