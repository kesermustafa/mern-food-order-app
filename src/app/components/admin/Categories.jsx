"use client"

import React, {useRef, useState} from 'react';
import {ChartBarStacked, HandPlatter} from "lucide-react";
import Input from "@/src/app/components/form/Input";

const CATEGORIES = [
    {
        id: 1,
        name: "Pizza",
    },
    {
        id: 2,
        name: "Burger",
    },
    {
        id: 3,
        name: "Drink",
    },
    {
        id: 4,
        name: "Turkish Kebap",
    }
];

const Categories = () => {

    const [categories, setCategories] = useState(CATEGORIES);
    const inputRef = useRef(null);

    const handleAddCategory = () => {
        const name = inputRef.current?.value?.trim();
        if (!name) return;

        const newCategory = {
            id: Date.now(),
            name,
        };

        setCategories((prev) => [...prev, newCategory]);
        inputRef.current.value = '';
    };

    const handleDeleteCategory = (id) => {
        setCategories((prev) => prev.filter(cat => cat.id !== id));
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center mb-8 gap-2">
                    <span
                        className='bg-gray-100 border-2 border-amber-600 p-4 rounded-full flex items-center justify-center'>
                         <ChartBarStacked size={32} className="text-amber-600 "/>
                    </span>
                    <h3 className="text-4xl font-dancing font-semibold text-amber-600 ">
                        Categories
                    </h3>
                </div>

                <div className="flex max-w-2xl mb-6 gap-1 flex-1 items-center">
                    <Input
                        placeholder="Add a new Category..."
                        ref={inputRef}
                    />
                    <button
                        onClick={handleAddCategory}
                        className="bg-amber-500 hover:bg-amber-600 cursor-pointer hover:text-white transition-all duration-300 w-24 p-2 rounded">
                        Add
                    </button>
                </div>

                {categories.length > 0 &&
                    <div className={'max-w-2xl'}>
                        {categories.map((item) => (
                            <div
                                className={'flex items-stretch hover:bg-gray-200 my-2 rounded-md font-exo border border-gray-200 justify-between '}
                                key={item.id}
                            >
                                <div className={'p-2'}>{item.name}</div>

                                <div>
                                    <button
                                        onClick={() => handleDeleteCategory(item.id)}
                                        className={'text-sm h-full bg-red-400 hover:bg-red-500 px-3 hover:text-white transition-all duration-300 cursor-pointer rounded-r-md'}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                }


            </div>
        </div>
    );
};

export default Categories;
