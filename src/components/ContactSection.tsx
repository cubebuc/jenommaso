type Props = {}
function ContactSection({ }: Props)
{
    return (
        <div className='py-14 flex flex-col items-center bg-orange-100' id='contact'>
            <h1 className='text-3xl font-cinzel'>KONTAKT</h1>
            <hr className='w-20 bg-stone-800 h-0.5 my-5' />
            <h2 className='text-lg mt-1'>JIŘÍHO DOBROTY</h2>
            <div className='mt-8 flex flex-col items-center gap-1'>
                <p>Jméno: Jiří Vybíral</p>
                <div className='flex flex-col items-center'>
                    <p>Telefon: +420 736 726 806</p>
                    <p className='-mt-0.5 text-green-600'>(Preferuji WhatsApp)</p>
                </div>
                <p>Email: jvybik@seznam.cz</p>
                <p>Účet: 273860866/0300</p>
            </div>
        </div>
    )
}
export default ContactSection