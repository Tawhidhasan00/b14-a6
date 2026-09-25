'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavTab = () => {

    const  pathname = usePathname();
    const workoutActive = pathname === '/' || pathname.startsWith('/workouts/');
    const planActive = pathname === '/my-plan';

    const tabFuction = ((active: boolean) => (
        `grid place-items-center rounded-full px-5 py-2.5 text-xs font-semibold
    ${active ? "bg-[#18240E] text-[#C2F800]" : "text-zinc-400 hover:bg-zinc-900 hover:text-white" }`
    ));


    return (
        <div className='flex items-center gap-2'>
            <Link href="/" className={tabFuction(workoutActive)}>
                Workouts
            </Link>

            <div className='w-22'>
                <Link href="/my-plan" className={tabFuction(planActive)}>
                    My Plan
                </Link>            
            </div>
        </div>
    );
};

export default NavTab;