"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import {IoCloseCircleOutline} from "react-icons/io5";

export default function SearchModal() {
    const router = useRouter();

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            router.back();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
            onClick={handleBackdropClick}
        >
            <div className="relative w-full sm:w-[90%] md:w-[80%] lg:w-[70%] h-[70%] rounded-xl bg-white p-6">
                <button
                    onClick={() => router.back()}
                    className="absolute cursor-pointer top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
                >
                    <IoCloseCircleOutline className={'hover:text-amber-600 transition-all'} />
                </button>

                {/* Modal içeriği */}
            </div>
        </div>
    );
}