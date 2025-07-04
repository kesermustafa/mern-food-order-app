import React from 'react';
import Image from "next/image";
import {FaSearch, FaShoppingCart, FaUser} from "react-icons/fa";
import {ShoppingCart, Star, Heart} from "lucide-react";

const MenuItem = () => {

    const price = 25

    return (
        <div
            className={'relative border rounded-md overflow-hidden font-roboto flex flex-col justify-between gap-4 border-gray-300 '}>

            <div

                className="absolute top-0 right-0 z-20 p-2 bg-white/40 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 group"
            >
                <button

                    className="absolute top-4 right-4 z-20 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 group"
                >
                    <Heart
                        className={`w-4 h-4 transition-all duration-300 ${
                            true ? 'text-red-500 scale-110 fill-current' : 'text-gray-400 hover:fill-current hover:text-red-400'
                        }`}
                    />
                </button>
            </div>


            <div className={'relative mt-4 w-48 h-44 hover:scale-105 transition-all duration-500 rounded-full overflow-hidden mx-auto'}>
                <Image src={'/images/pizza-400.jpg'}
                       alt={"image"}
                       fill
                       sizes="(max-width: 768px) 100vw, 50vw"
                       className="object-cover "
                />
            </div>

            <div className="relative bg-gray-800 gap-2 flex text-white flex-col justify-between p-4 ">
                <div className="absolute overflow-hidden -top-10 w-12 h-10 bg-gray-800 left-0 border-none outline-none">
                    <div className="w-14 h-10 bg-white border-none outline-none rounded-bl-full shadow-none"/>
                </div>

                <div className="absolute overflow-hidden top-0 right-0 w-12 h-10 bg-white  border-none outline-none">
                    <div className="w-12 h-10 bg-gray-800 border-none outline-none rounded-tr-full shadow-none"/>
                </div>

                <div className="flex items-center gap-1 mb-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current"/>
                    <span className="text-sm font-medium text-gray-200">4.9</span>
                    <span className="text-xs text-gray-400">(124 değerlendirme)</span>
                </div>

                <h2 className="font-semibold font-dancing text-3xl ">Title</h2>

                <div className="flex flex-col">
                    <span className="text-2xl font-bold font-dancing text-gray-300">
                        <span className={'text-base'}>$</span>{price}
                     </span>
                    <span className="text-xs text-gray-500 line-through">₺{(price * 1.17).toFixed(2)}</span>
                </div>

                <div className="w-full flex justify-end">
                    <button className="p-2 hover:scale-105 rounded-full cursor-pointer border border-amber-400">
                        <FaShoppingCart className="hover:scale-105 text-amber-500"/>
                    </button>
                </div>
            </div>

        </div>
    );
};

export default MenuItem;
