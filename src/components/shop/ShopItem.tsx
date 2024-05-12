type Props = { product: { [key: string]: any } }
function ShopItem({ product }: Props)
{
    return (
        <div className='w-fit m-1 p-3 text-sm flex flex-col items-center justify-center transition-all hover:shadow-xl'>
            <img className='w-60 h-60 object-contain' src={product.images[0]} alt={product.name} />
            <div className='my-5 text-center'>
                <h3>{product.name}</h3>
                <p>{product.packagePrice} Kč</p>
            </div>
            <button className='bg-stone-600 text-white px-2 py-1 rounded-lg'>
                Do košíku
            </button>
        </div>
    )
}
export default ShopItem