type Props = {}
function ShopItem({ }: Props)
{
    return (
        <div className='p-3 text-sm flex flex-col items-center justify-center transition-all hover:shadow-lg'>
            <img className='w-60 h-60' src='https://via.placeholder.com/240' alt='placeholder' />
            <div className='my-5 text-center'>
                <h3>Product Name</h3>
                <p>$100.00</p>
            </div>
            <button className='bg-stone-600 text-white px-2 py-1 rounded-lg'>
                Do košíku
            </button>
        </div>
    )
}
export default ShopItem