type Props = { children: React.ReactNode }
function Modal({ children }: Props)
{
    return (
        <div className='w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded shadow-lg' onClick={e => e.stopPropagation()}>
            {children}
        </div>
    )
}
export default Modal