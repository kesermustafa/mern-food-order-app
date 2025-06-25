"use client"
import React, { useEffect, useRef, useState } from 'react';
import { RiMenuFold2Line, RiMenuFoldLine } from "react-icons/ri";
import Link from "next/link";
import { usePathname } from "next/navigation";
import OrderOnline from "@/src/app/components/OrderOnline";

const ScrollMenu = () => {
    const pathname = usePathname();
    const [isMenu, setIsMenu] = useState(false);
    const menuList = useRef(null);

    const getLinkClass = (path) => {
        const isActive = pathname === path;
        return `transition-colors font-exo duration-200 px-3 py-2 hover:text-amber-500 ${
            isActive ? 'text-amber-600 font-semibold' : 'text-gray-300'
        }`;
    };

    // Menü dışına tıklanınca menüyü kapat
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuList.current && !menuList.current.contains(event.target)) {
                setIsMenu(false);
            }
        };

        if (isMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMenu]);

    return (
        <div className={'relative'}>
            <div className={"md:hidden mx-2 relative z-50"} onClick={() => setIsMenu(!isMenu)}>
                {isMenu
                    ? <RiMenuFold2Line size={24} className={'text-amber-500 cursor-pointer'} />
                    : <RiMenuFoldLine size={24} className={'text-amber-500 cursor-pointer'} />
                }
            </div>

            <div
                ref={menuList}
                className={`
                    md:hidden
                    fixed top-0 right-0 h-full w-56 pt-10 
                    bg-black/20 backdrop-blur-md 
                    z-40 transition-transform duration-500 ease-in-out
                    ${isMenu ? 'translate-x-0' : 'translate-x-full'}
                `}
            >
                <nav className='flex flex-col gap-4 p-6 text-nowrap'>
                    <Link href='/' className={getLinkClass('/')} onClick={() => setIsMenu(false)}>HOME</Link>
                    <Link href='/menu' className={getLinkClass('/menu')} onClick={() => setIsMenu(false)}>MENU</Link>
                    <Link href='/about' className={getLinkClass('/about')} onClick={() => setIsMenu(false)}>ABOUT</Link>
                    <Link href='/' className={getLinkClass('/book-table')} onClick={() => setIsMenu(false)}>BOOK TABLE</Link>
                </nav>

                <div className={'p-6 w-full'} onClick={() => setIsMenu(false)}>
                    <OrderOnline/>
                </div>

            </div>
        </div>
    );
};

export default ScrollMenu;
