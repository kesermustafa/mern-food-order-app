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

const MobileProductItem = ({product, index}) => (
    <div className={`p-4 rounded-lg font-exo ${index % 2 === 0 ? 'bg-gray-400' : 'bg-gray-200'}`}>
        <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-semibold">#{index + 1}</span>
            <div className="flex items-center gap-2">
                <span className="font-semibold text-lg">{product.name}</span>
                <ProductImage src={product.image} alt="food image"/>
            </div>
        </div>

        <div className="space-y-2">
            <ProductDetailRow label="Extras" value={product.extras}/>
            <ProductDetailRow
                label="Price"
                value={
                    <>
                        <span className="text-sm">$</span>
                        <span className="font-semibold">{product.price}</span>
                    </>
                }
            />
            <ProductDetailRow label="Quantity" value={product.quantity} isBold/>
            <div className="flex items-center border-b justify-between border-dashed border-t py-2">
                <ProductDetailRow
                    label="Total"
                    value={
                        <>
                            <span className="text-sm">$</span>
                            <span>{product.quantity * product.price}</span>
                        </>
                    }
                    isBold
                    isLarge
                />
            </div>
        </div>
    </div>
);

const ProductDetailRow = ({label, value, isBold = false, isLarge = false}) => (
    <div className="flex justify-between">
    <span className={`font-medium text-gray-700 ${isBold ? 'font-semibold' : ''}`}>
      {label}
    </span>
        <span className={`${isBold ? 'font-semibold' : ''} ${isLarge ? 'text-lg' : ''}`}>
      {value}
    </span>
    </div>
);

const DesktopProductRow = ({product, index}) => (
    <tr className={`h-12 hover:bg-gray-600 hover:text-white ${index % 2 === 0 ? 'bg-gray-400 ' : 'bg-gray-200 '}`}>
        <td className="w-12 text-center">{index + 1}</td>
        <td className="">
            <span className="font-semibold">{product.id}</span>
        </td>
        <td>
            <ProductImage src={product.image} alt="food image"/>

        </td>
        <td className="">
            <span className="font-semibold">{product.name}</span>
        </td>

        <td className="text-center">${product.price}</td>

        <td className="max-w-16 text-center">
            <span
                className="text-sm bg-red-500 px-2 py-1 rounded-md text-white cursor-pointer">DELETE</span>


        </td>
    </tr>
);

const Products = () => {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <ProductHeader/>

                <div className="w-full h-full md:flex md:gap-4 overflow-hidden mt-8 rounded">
                    {/* Mobile View */}
                    <div className="md:hidden space-y-4">
                        {PRODUCTS.map((product, index) => (
                            <MobileProductItem
                                key={product.id}
                                product={product}
                                index={index}
                            />
                        ))}
                    </div>

                    {/* Desktop View */}
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