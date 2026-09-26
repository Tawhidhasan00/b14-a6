'use client'
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/logo.png'
import NavTab from './NavTab';
import { useWorkouts } from '@/contexts/WorkoutContext';

const Navbar = () => {

    const { plan, saved } = useWorkouts();

    const links = <>
        <li> <Link href='/#library'>Workouts</Link> </li>
        <li> <Link href='/my-plan'>My Plan</Link> </li>
    </>

    return (
        <nav className='bg-base-100 shadow-sm border-b border-b-gray-800 sticky top-0 z-50'>

            <div className="navbar max-w-7xl mx-auto flex items-center justify-between px-2 sm:px-6">

                <div className="navbar-start">
                    <div className="dropdown">

                    <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
                        <svg aria-label="Menu" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={-1}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {links}
                    </ul>
                    </div>

                    <Link href='/'> 
                        <div className='flex shrink-0 items-center gap-2'>
                            <Image src={logo} alt='Logo' className='size-7 ' ></Image>
                            <span className="hidden text-xl sm:inline">FITLOG</span>
                        </div>
                    </Link>
                    
                </div>

                <div className="hidden md:block">
                    <NavTab />
                </div>


                <div className="navbar-end flex gap-2 sm:gap-3">
                    <Link href='/my-plan' className="btn rounded-2xl max-sm:btn-sm max-sm:px-2">
                        <span className="hidden sm:inline">Plan</span>
                        <span className='inline-flex size-6 items-center justify-center rounded-full bg-[#C2F800] text-[#18240E]'>
                            {plan.length}
                        </span>
                    </Link>
                    
                    <Link href='/my-plan' className="btn rounded-2xl max-sm:btn-sm max-sm:px-2">
                        <span className="hidden sm:inline">Saved</span>
                        <span className='inline-flex size-6 items-center justify-center rounded-full border border-gray-400'>
                            {saved.length}
                        </span>
                    </Link>
                </div>
                
            </div>

        </nav>
    );
};

export default Navbar;
