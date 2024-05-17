import { useState } from 'react'
import MainLayout from '../layouts/MainLayout'
import ShopItem from '../components/shop/ShopItem'
import { useGlobal } from '../contexts/GlobalContext'

type Props = {}
function ShopPage({ }: Props)
{
    const [search, setSearch] = useState('')
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [selectedTreatments, setSelectedTreatments] = useState<string[]>([])
    const [selectedUsages, setSelectedUsages] = useState<string[]>([])

    const { products, tags } = useGlobal().state

    return (
        <MainLayout>
            <h1 className='mt-24 mb-10 text-4xl text-center font-playfair'>
                Nabídka
            </h1>
            <div className='flex justify-center'>
                <input
                    className='w-11/12 sm:w-5/6 md:w-2/3 lg:w-1/2 p-2 border rounded text-lg'
                    type='text'
                    placeholder='Search'
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>
            <div className='flex flex-col justify-center items-center'>
                <div className='w-11/12 sm:w-5/6 md:w-2/3 lg:w-1/2 p-2 pt-1 mt-2 border'>
                    <div className='mr-4'>
                        <h2 className='text-xl'>Kategorie</h2>
                        <div className='flex flex-wrap'>
                            {tags.category.map(category =>
                                <div key={category} className='mr-4 flex items-center'>
                                    <label>
                                        <input
                                            type='checkbox'
                                            checked={selectedCategories.includes(category)}
                                            onChange={e =>
                                            {
                                                if (e.target.checked)
                                                    setSelectedCategories([...selectedCategories, category])
                                                else
                                                    setSelectedCategories(selectedCategories.filter(t => t !== category))
                                            }}
                                        />
                                        <span className='ml-1'>{category}</span>
                                    </label>
                                </div>
                            )}
                        </div>
                    </div>
                    <hr className='w-full my-1' />
                    <div className='mr-4'>
                        <h2 className='text-xl'>Úprava</h2>
                        <div className='flex flex-wrap'>
                            {tags.treatment.map(treatment =>
                                <div key={treatment} className='mr-4 flex items-center'>
                                    <label>
                                        <input
                                            type='checkbox'
                                            checked={selectedTreatments.includes(treatment)}
                                            onChange={e =>
                                            {
                                                if (e.target.checked)
                                                    setSelectedTreatments([...selectedTreatments, treatment])
                                                else
                                                    setSelectedTreatments(selectedTreatments.filter(t => t !== treatment))
                                            }}
                                        />
                                        <span className='ml-1'>{treatment}</span>
                                    </label>
                                </div>
                            )}
                        </div>
                    </div>
                    <hr className='w-full my-1' />
                    <div className='mr-4'>
                        <h2 className='text-xl'>Využití</h2>
                        <div className='flex flex-wrap'>
                            {tags.usage.map(usage =>
                                <div key={usage} className='mr-4 flex items-center'>
                                    <label>
                                        <input
                                            type='checkbox'
                                            checked={selectedUsages.includes(usage)}
                                            onChange={e =>
                                            {
                                                if (e.target.checked)
                                                    setSelectedUsages([...selectedUsages, usage])
                                                else
                                                    setSelectedUsages(selectedUsages.filter(t => t !== usage))
                                            }}
                                        />
                                        <span className='ml-1'>{usage}</span>
                                    </label>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-center'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                    {Object.entries(products).filter(([_, product]) =>
                    {
                        if (search.length > 0 && !product.name.toLowerCase().includes(search.toLowerCase()))
                            return false

                        for (const category of selectedCategories)
                            if (!product.category.includes(category))
                                return false
                        for (const treatment of selectedTreatments)
                            if (!product.treatment.includes(treatment))
                                return false
                        for (const usage of selectedUsages)
                            if (!product.usage.includes(usage))
                                return false

                        return true
                    }).map(([id, product]) =>
                        !product.hidden && product.stock > 0 &&
                        <ShopItem key={id} id={id} product={product} />
                    )}
                </div>
            </div>
        </MainLayout>
    )
}
export default ShopPage