'use client';
import React, { useState } from 'react';
import Title from "@/src/app/components/Title";
import MenuItem from "@/src/app/components/products/MenuItem";

const MenuWrapper = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const categories = ['All', 'Burger', 'Pizza', 'Drinks'];

    return (
        <div className="!container mx-auto">
            <div className="flex flex-col gap-4 items-center">
                <Title title="Our Menu" desing="text-5xl mb-8 text-amber-600" />

                <div className="flex flex-wrap items-center w-full justify-center gap-4">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`
                                w-24 border border-gray-400 rounded-full py-[6px]
                                flex items-center justify-center font-roboto text-sm font-semibold cursor-pointer
                                ${activeCategory === category ? 'bg-gray-700 text-white' : 'text-gray-600 hover:bg-gray-300'}
                            `}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            <div className={'mt-6 px-4 grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4 gap-y-12'} >
                <MenuItem/>
                <MenuItem/>
                <MenuItem/>
                <MenuItem/>
                <MenuItem/>
            </div>

            <div className={'p-20'}></div>
        </div>
    );
};

export default MenuWrapper;
