"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import {IoCloseCircleOutline} from "react-icons/io5";
import Title from "@/src/app/components/Title";
import Image from "next/image";
import {useWheelScroll} from "@/src/app/hooks/useWheelScroll";


export default function SearchModal() {
    const router = useRouter();

    const { containerRef, scrollPercentage } = useWheelScroll({
        scrollSpeed: 50,     // Kaydırma hızı
        smoothScroll: true,  // Smooth animasyon
    });

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            router.back();
        }
    };

    return (
        <div
            className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 flex items-center justify-center overflow-hidden z-50"
            onClick={handleBackdropClick}
        >
            <div className="flex flex-col justify-between w-full sm:w-[95%] mx-2 lg:w-[60%] xl:w-[50%] rounded-xl bg-white p-4 max-h-[90vh]"> {/* Modal maksimum yükseklik eklendi */}

                {/* Kapatma Butonu */}
                <div className={'flex justify-end'}>
                    <button
                        onClick={() => router.back()}
                        className="cursor-pointer text-gray-500 hover:text-gray-700 text-2xl"
                    >
                        <IoCloseCircleOutline className={'hover:text-amber-600 transition-all'} />
                    </button>
                </div>

                {/* Modal İçeriği */}
                <div className='flex flex-col flex-1 w-full text-gray-800 overflow-hidden'> {/* overflow-hidden eklendi */}
                    <Title title={"Search"} desing={"text-2xl text-amber-600 mb-4 font-semibold w-full"} />

                    <div className='font-exo flex flex-col items-center gap-4 h-full'>
                        {/* Arama Input */}
                        <input
                            type="text"
                            placeholder="search..."
                            className='border-amber-300 border px-4 py-2 focus:outline-none focus:border-amber-500 rounded-xl w-full max-w-[600px]'
                        />


                        <div ref={containerRef} className="w-full overflow-auto hide-scrollbar max-w-[600px] h-[300px]">
                            <ul

                                className='flex flex-col  gap-2 pr-2'>

                                <li className='hover:border-amber-500 cursor-pointer border border-gray-50 hover:border px-2 py-1 transition-all rounded-md'>
                                    <div className="flex justify-between items-center">
                                        <div className='relative w-12 h-12'>
                                            <Image src="/images/f1.png" alt="food" fill className='object-cover' />
                                        </div>
                                        <Title title="Good Pizza" desing="text-md font-montserrat text-gray-900" />
                                        <p className='text-sm'>$<span className='font-semibold'>10</span></p>
                                    </div>
                                </li>

                                {[...Array(10)].map((_, i) => (
                                    <li key={i} className='hover:border-amber-500 cursor-pointer border border-gray-50 hover:border px-2 py-1 transition-all rounded-md'>
                                        <div className="flex justify-between items-center">
                                            <div className='relative w-12 h-12'>
                                                <Image src="/images/f1.png" alt="food" fill className='object-cover' />
                                            </div>
                                            <Title title={`Product ${i+1}`} desing="text-md font-montserrat text-gray-900" />
                                            <p className='text-sm'>$<span className='font-semibold'>{i+5}</span></p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}