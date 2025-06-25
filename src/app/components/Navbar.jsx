"use client"
import NavLinks from "@/src/app/components/NavLinks";
import Link from "next/link";
import {FaSearch, FaShoppingCart, FaUser} from "react-icons/fa";
import ScrollMenu from "@/src/app/components/scrollMenu";
import OrderOnline from "@/src/app/components/OrderOnline";
import { usePathname } from 'next/navigation';


const Navbar = () => {

    const isHome = usePathname() === '/';

    return (

        <div className={`${isHome ? "fixed" : "flex"}  top-0 left-0 right-0 z-40`}>
            <div className='container mx-auto h-[5rem] flex items-center justify-between px-2'>
                <Link href={"/"} className='font-dancing font-[600] text-[2rem] text-amber-500'>KeserFood</Link>

                <NavLinks/>

                <div className='flex items-center justify-between'>

                    <div className="flex mr-4 items-center gap-4">
                        <Link href={"/"} className={'hover:text-amber-500'}><FaUser size={18}/></Link>
                        <Link href={"/"} className={'hover:text-amber-500'}><FaShoppingCart size={18}/></Link>
                        <Link href={"/search"} scroll={false} className={'hover:text-amber-500'}><FaSearch
                            size={18}/></Link>
                    </div>

                    <div className={'hidden md:block'}>
                        <OrderOnline/>
                    </div>

                    <ScrollMenu/>

                </div>

            </div>
        </div>

    );
};

export default Navbar;