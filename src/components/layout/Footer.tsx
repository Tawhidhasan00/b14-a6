import Image from 'next/image';
import logo from '@/assets/logo.png'

const Footer = () => {
    return (
        <footer className='border-t border-t-zinc-700 '>
            <div className='max-w-7xl mx-auto w-full flex justify-between items-center my-7'>
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