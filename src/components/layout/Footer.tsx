import Image from 'next/image';
import logo from '@/assets/logo.png'

const Footer = () => {
    return (
        <footer className='border-t border-t-zinc-700 '>

            <div className='mx-auto my-7 flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-4 text-center sm:flex-row sm:px-0 sm:text-left'>
                <div className='flex items-center gap-2'>
                    <Image src={logo} alt='Logo' className='size-4 ' ></Image>
                    <p className="text-sm">FITLOG</p>
                </div>            
                <p className='text-gray-500 text-sm'>© 2026 FitLog - Workout Library. Train hard, log honest.</p>
            </div>
        </footer>
    );
};

export default Footer;
