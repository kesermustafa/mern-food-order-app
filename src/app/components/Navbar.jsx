"use client"
import NavLinks from "@/src/app/components/NavLinks";
import Link from "next/link";
import {FaSearch, FaShoppingCart, FaUser} from "react-icons/fa";
import ScrollMenu from "@/src/app/components/scrollMenu";
import OrderOnline from "@/src/app/components/OrderOnline";
import {usePathname} from 'next/navigation';
import {useEffect, useState} from "react";
import useCartStore from "@/src/app/redux/store/cartStore";
import useFavoritesStore from "@/src/app/redux/store/useFavoritesStore";

const Navbar = () => {
    const pathname = usePathname();
    const isHome = pathname === '/';
    const [isScrolled, setIsScrolled] = useState(false);
    const {quantity, products, total} = useCartStore((state) => state);
    const favorites = useFavoritesStore((state) => state.favorites);

    useEffect(() => {
        if (!isHome) return;

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isHome]);

    return (
        <div className={`
            ${isHome ? "fixed" : "flex bg-gray-800 text-white"} 
            top-0 left-0 right-0 z-40 
            transition-all duration-300 
            ${isHome && isScrolled ? "md:bg-gradient-to-b md:from-white/70 md:to-transparent md:backdrop-blur-md " : ""}
        `}>
            <div className='container mx-auto h-[4rem] flex items-center justify-between px-2'>
                <Link href={"/"} className='font-dancing font-[600] text-[2rem] text-amber-600'>KeserFood</Link>

                <NavLinks/>

                <div className='flex items-center justify-between'>

                    <div
                        className={`${isHome ? "text-gray-200 md:text-gray-700" : "text-gray-200"} flex mr-4 items-center  gap-4`}>
                        <Link href={"/auth/login"} className={'hover:text-amber-500'}><FaUser size={18}/></Link>

                        {/* Simple Cart Link with Quantity Badge */}
                        <div className="relative">
                            <Link href={"/order-basket"} className="hover:text-amber-500">
                                <FaShoppingCart size={18}/>
                                {quantity > 0 && (
                                    <span
                                        className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                                        {quantity}
                                    </span>
                                )}
                            </Link>
                        </div>

                        <Link href={"/search"} scroll={false} className={'hover:text-amber-500'}>
                            <FaSearch size={18}/>
                        </Link>
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