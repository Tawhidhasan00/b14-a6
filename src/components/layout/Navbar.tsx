import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/logo.png'
import NavTab from './NavTab';

const Navbar = () => {

    const links = <>
        <li> <Link href='/workouts'>Workouts</Link> </li>
        <li> <Link href='/my-plan'>My Plan</Link> </li>
    </>

    return (
        <nav className='bg-base-100 shadow-sm border-b border-b-gray-800 sticky'>
            <div className="navbar max-w-7xl mx-auto">

                <div className="navbar-start">
                    <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg aria-label="Menu" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={-1}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {links}
                    </ul>
                    </div>

                    <Link href='/'> 
                        <div className='flex items-center gap-1'>
                            <Image src={logo} alt='Logo' className='size-7 ' ></Image>
                            <button className="btn btn-ghost text-xl">FITLOG</button>
                        </div>
                    </Link>
                    
                </div>

                <NavTab/>

                <div className="navbar-end flex gap-3 ">
                    <button className="btn rounded-2xl"> Plan 
                        <span className='text-[#18240E] bg-[#C2F800] inline-flex items-center justify-center w-6 h-6 rounded-full  '
                                        > 0 </span>
                    </button>
                    <button className="btn rounded-2xl "> Saved 
                        <span className='border border-gray-400 inline-flex items-center justify-center w-6 h-6 rounded-full'> 0 </span>
                    </button>
                </div>
                
            </div>            
        </nav>
    );
};

export default Navbar;