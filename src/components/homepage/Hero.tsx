import Image from 'next/image';
import banner from '@/assets/banner.png'
import Link from 'next/link';

const HeroSection = () => {
    return (

        <div className='mx-4 my-6 grid max-w-7xl grid-cols-1 items-center gap-8 rounded-2xl bg-[#101216] px-5 py-8 sm:mx-6 sm:my-10 sm:px-8 sm:py-10 lg:mx-auto lg:my-15 lg:grid-cols-2 lg:gap-4 lg:px-10 lg:py-15'>
            <div className='space-y-5'>
                <h4 className='text-sm text-[#C2F800]'>WORKOUT LIBRARY</h4>
                <h2 className='text-3xl font-bold text-white sm:text-4xl lg:text-5xl'>TRAIN WITH INTENT. LOG <br/> EVERY SET. </h2>
                <p className='text-sm text-gray-500 sm:text-[15px]'> FitLog is a dark, no-nonsense gym companion: pick a lift, lock it <br className='hidden lg:block'/> into todays plan, and watch the weeks work add up.
                </p>
                <Link href='/#library' className='inline-flex rounded-[5px] bg-[#C2F800] px-3 py-1 text-[15px] font-semibold text-black'>
                    BROWSE WORKOUTS
                </Link>
            </div>

            <div className='flex justify-end'>

                <Image src={banner} alt='banner' className='h-auto max-w-full' />
            </div>
        </div>
    );
};

export default HeroSection;
