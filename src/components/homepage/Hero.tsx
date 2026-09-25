import Image from 'next/image';
import banner from '@/assets/banner.png'
import Link from 'next/link';

const HeroSection = () => {
    return (
        <div className='max-w-7xl mx-auto bg-[#101216] gap-4 my-15 rounded-2xl py-15 px-10
                        grid grid-cols-2 justify-around items-center'>
            <div className='space-y-5'>
                <h4 className='text-sm text-[#C2F800]'>WORKOUT LIBRARY</h4>
                <h2 className='text-5xl font-bold text-white'>TRAIN WITH INTENT. LOG <br/> EVERY SET. </h2>
                <p className='text-[15px] text-gray-500'> FitLog is a dark, no-nonsense gym companion: pick a lift, lock it <br/> into todays plan, and watch the weeks work add up.
                </p>
                <Link href='/#library'>
                    <button className='bg-[#C2F800] text-black px-3 py-1 rounded-[5px] text-[15px] font-semibold'>BROWSE WORKOUTS 
                        --{'>'} 
                    </button>                    
                </Link>
            </div>

            <div className='flex justify-end'>
                <Image src={banner} alt='banner'>

                </Image>
            </div>
        </div>
    );
};

export default HeroSection;