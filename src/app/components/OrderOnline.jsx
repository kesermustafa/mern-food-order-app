import React from 'react';
import Link from "next/link";

const OrderOnline = () => {
    return (
        <Link href={'/menu'} >
            <button className={'cursor-pointer rounded-full font-montserrat text-gray-800 text-xs font-semibold text-nowrap px-4 py-2 bg-amber-500 transition-all hover:bg-amber-400 hover:text-gray-900'}>
                Order Online
            </button>
        </Link>
    );
};

export default OrderOnline;
