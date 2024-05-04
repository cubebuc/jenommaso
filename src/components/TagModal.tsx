import { addTag, deleteTag } from "../utils/firebase"

type Props = { setShow: React.Dispatch<React.SetStateAction<boolean>>, setTags: React.Dispatch<React.SetStateAction<{ [key: string]: string[] }>>, tags: { [key: string]: string[] } }
function TagModal({ setShow, setTags, tags }: Props)
{
    async function handleAddTag(type: string, tag: string)
    {
        if (tags[type].includes(tag)) return

        await addTag(type, tag)
        setTags(tags =>
        {
            const newTags = { ...tags }
            newTags[type] = [...tags[type], tag]
            return newTags
        })
    }

    function handleAddCategory(e: React.FormEvent<HTMLFormElement>)
    {
        e.preventDefault()
        const form = e.currentTarget
        const category = (form[0] as any).value
        form.reset()
        handleAddTag('category', category)
    }

    function handleAddUsage(e: React.FormEvent<HTMLFormElement>)
    {
        e.preventDefault()
        const form = e.currentTarget
        const usage = (form[0] as any).value
        form.reset()
        handleAddTag('usage', usage)
    }

    async function handleDeleteTag(type: string, tag: string)
    {
        await deleteTag(type, tag)
        setTags(tags =>
        {
            const newTags = { ...tags }
            newTags[type] = tags[type].filter(t => t !== tag)
            return newTags
        })
    }

    return (
        <div className='w-11/12 sm:w-5/6 md:w-2/3 lg:w-1/2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded shadow-lg' onClick={e => e.stopPropagation()}>
            <h1 className='ml-2 mb-3 text-3xl font-bold underline'>
                Tags
            </h1>
            <div className='mt-2'>
                <h2 className='mb-3 text-xl'>
                    Category
                </h2>
                <form className='flex items-center mb-3' onSubmit={handleAddCategory}>
                    <input className='border px-4 py-2' type='text' placeholder='Add Category' />
                    <button className='px-4 py-2 bg-blue-500 text-white rounded ml-2'>
                        Add
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
                    Category
                </h2>
                <form className='flex items-center mb-3' onSubmit={handleAddUsage}>
                    <input className='border px-4 py-2' type='text' placeholder='Add Usage' />
                    <button className='px-4 py-2 bg-blue-500 text-white rounded ml-2'>
                        Add
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
            <button className='m-4 px-4 py-2 bg-blue-500 text-white rounded' onClick={() => setShow(false)}>
                Close
            </button>
        </div>
    )
}
export default TagModal