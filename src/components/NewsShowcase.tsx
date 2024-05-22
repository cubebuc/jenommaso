import { useGlobal } from '../contexts/GlobalContext'

type Props = {}
function NewsShowcase({ }: Props)
{
    const { news } = useGlobal().state

    return (
        <div className='py-8 flex flex-col items-center bg-orange-100' id='news'>
            {Object.entries(news).sort((a, b) => b[1].date - a[1].date).map(([id, news]) =>
                <div key={id} className={`w-4/5 lg:w-1/3 px-5 pb-5 mb-5 last:mb-0 last:border-none last:pb-0 text-center border-b border-stone-400`}>
                    <p className='-mb-1 text-sm text-stone-500'>{news.date.toDate().toLocaleDateString()}</p>
                    <h1 className='text-2xl font-playfair'>{news.title}</h1>
                    <p className='mt-3 whitespace-pre-line'>{news.content}</p>
                </div>
            )}
        </div>
    )
}
export default NewsShowcase