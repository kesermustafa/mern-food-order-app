import React from 'react';
import {Utensils} from "lucide-react";
import Image from "next/image";

const PRODUCTS = [
    {
        id: 1,
        name: "Pizza",
        extras: 'Cheese, Tomato',
        price: 10,
        quantity: 2,
        image: '/images/f1.png',
    },
    {
        id: 2,
        name: "Burger",
        extras: 'Onion, Lettuce',
        price: 12,
        quantity: 1,
        image: '/images/about-img.png',
    },
    {
        id: 3,
        name: "Pizza 2",
        extras: 'Ketchup, Mayo',
        price: 9,
        quantity: 3,
        image: '/images/f1.png',
    },
    {
        id: 4,
        name: "Turkish Kebap",
        extras: 'Acili, Salata',
        price: 19,
        quantity: 1,
        image: '/images/f1.png',
    }
];

// Helper Components
const ProductHeader = () => (
    <div className="flex items-center gap-2">
        <span className='bg-gray-100 border-2 border-amber-600 p-4 rounded-full flex items-center justify-center'>
            <Utensils size={32} className="text-amber-600"/>
        </span>
        <h3 className="text-4xl font-dancing font-semibold text-amber-600">
            Products
        </h3>
    </div>
);

const ProductImage = ({src, alt}) => (
    <div className="relative w-12 h-12">
        <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 200px"
            style={{objectFit: "cover"}}
        />
    </div>
);

const MobileProductCard = ({product, index}) => (
    <div
        className={`rounded-xl font-exo mb-4 overflow-hidden shadow-sm border ${index % 2 === 0 ? 'bg-white border-gray-200' : 'bg-gray-50 border-gray-300'}`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-600 px-4 py-2 flex justify-between items-center">
            <span className="text-white font-semibold text-sm">Product #{index + 1}</span>
            <span className="text-blue-100 text-xs">ID: {product.id}</span>
        </div>

        {/* Content */}
        <div className="mt-4 px-2 space-y-2">
            {/* Image and Title Section */}
            <div className="flex  items-center space-x-4">
                <div className="flex-shrink-0">
                    <ProductImage
                        src={product.image}
                        alt="food image"
                        className="w-20 h-20 object-cover rounded-lg border-2 border-gray-200"
                    />
                </div>
                <div className="flex-1 flex items-center justify-between min-w-0">
                    <h3 className="font-bold text-gray-900 text-lg leading-tight truncate">
                        {product.name}
                    </h3>
                    <div className="mt-2">
                        <span className="text-lg font-bold text-green-600">
                            ${product.price}
                        </span>
                    </div>
                </div>
            </div>

            {/* Action Section */}
            <div className="flex py-2 justify-end pt-1 border-t border-gray-200">
                <button
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg">
                    <span className="text-sm">DELETE</span>
                </button>
            </div>
        </div>
    </div>
);

const DesktopProductRow = ({product, index}) => (
    <tr className={`h-12 hover:bg-gray-600 hover:text-white ${index % 2 === 0 ? 'bg-gray-400 ' : 'bg-gray-200 '}`}>
        <td className="w-16 text-center">{index + 1}</td>
        <td className="min-w-16">{product.id}</td>
        <td className="min-w-16">
            <ProductImage src={product.image} alt="food image"/>
        </td>
        <td className="min-w-24 font-semibold">{product.name}</td>
        <td className="min-w-24 text-center">${product.price}</td>
        <td className="min-w-24 text-center">
            <span className="text-sm bg-red-500 px-2 py-1 rounded-md text-white cursor-pointer">DELETE</span>
        </td>
    </tr>
);

const Products = () => {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <ProductHeader/>

                <div className="w-full h-full md:flex md:gap-4 overflow-hidden mt-8 rounded">
                    {/* Mobile View - Stacked Card Layout */}
                    <div className="md:hidden space-y-2">
                        {PRODUCTS.map((product, index) => (
                            <MobileProductCard
                                key={product.id}
                                product={product}
                                index={index}
                            />
                        ))}
                    </div>

                    {/* Desktop View - Table Layout (unchanged) */}
                    <div className="hidden md:flex-1 md:block overflow-x-auto">
                        <table className="w-full text-left font-exo">
                            <thead>
                            <tr className="bg-gray-700 text-md text-gray-200 h-12">
                                <th className="w-16 text-center">#</th>
                                <th>ID</th>
                                <th>IMAGE</th>
                                <th>TITLE</th>
                                <th className="w-28 text-center">PRICE</th>
                                <th className="w-28 text-center text-nowrap">ACTION</th>
                            </tr>
                            </thead>
                            <tbody>
                            {PRODUCTS.map((product, index) => (
                                <DesktopProductRow
                                    key={product.id}
                                    product={product}
                                    index={index}
                                />
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;