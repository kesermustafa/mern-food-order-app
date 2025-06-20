/*"use client"
import React, {useState, useRef} from 'react';*/
import NavLinks from "@/src/app/components/NavLinks";
import Link from "next/link";
import {FaSearch, FaShoppingCart, FaUser} from "react-icons/fa";

const Navbar = () => {
/*    const [isModal, setIsModal] = useState(false);
    const modalRef = useRef(null);*/

/*    const handleModalClose = (e) => {
        if (e.target === e.currentTarget) {
            setIsModal(false);
        }
    };*/

    return (
        <div className='container mx-auto h-[5rem] flex items-center justify-between'>
            <Link href={"/"} className='font-dancing font-[600] text-[2rem] text-amber-500 p-2'>KeserFood</Link>
            <NavLinks/>
            <div className='flex gap-2 items-center justify-between'>
                <Link href={"/"} className={'hover:text-amber-500'}><FaUser /></Link>
                <Link href={"/"} className={'hover:text-amber-500'}><FaShoppingCart /></Link>
                <Link href={"/search"} className={'hover:text-amber-500'}><FaSearch /></Link>

{/*                <button
                    className={'hover:text-amber-500 cursor-pointer'}
                    onClick={(e) => {setIsModal(!isModal);
                    }}
                >
                    <FaSearch />
                </button>*/}
                <Link href={'/menu'}>
                    <button className={'cursor-pointer rounded-full font-montserrat text-gray-800 text-xs font-semibold text-nowrap px-4 py-2 bg-amber-500 transition-all hover:bg-amber-400 hover:text-gray-900'}>
                        Order Online
                    </button>
                </Link>
            </div>
{/*            {isModal && (
                <div
                    className={"absolute rounded-xl inset-0 bg-black/30 flex items-center justify-center"}
                    onClick={handleModalClose}
                    ref={modalRef}
                >
                    <div
                        className={'flex w-full sm:w-[90%] md:w-[80%] lg:w-[70%] h-[70%] rounded-xl items-center text-gray-800 justify-center bg-white'}
                    >
                        MODAL
                    </div>
                </div>
            )}*/}
        </div>
    );
};

export default Navbar;