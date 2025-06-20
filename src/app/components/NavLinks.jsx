'use client';

import React from 'react';
import Link from "next/link";
import { usePathname } from 'next/navigation'; // App Router için

const NavLinks = () => {
    const pathname = usePathname();

    const getLinkClass = (path) => {
        const isActive = pathname === path;
        return `transition-colors font-exo duration-200  px-3 py-2 hover:text-amber-500 ${
            isActive ? 'text-amber-600 font-semibold' : 'text-gray-200'
        }`;
    };

    return (
        <nav className='flex items-center text-nowrap justify-between p-4 gap-4 sm:gap-6 lg:gap-8'>
            <Link  href={'/'} className={`${getLinkClass('/')} `}>HOME</Link>
            <Link  href={'/menu'} className={`${getLinkClass('/menu')} `}>MENU</Link>
            <Link href={'/about'} className={getLinkClass('/about')}>ABOUT</Link>
            <Link href={'/'} className={getLinkClass('/book-table')}>BOOK TABLE</Link>
        </nav>
    );
};

export default NavLinks;