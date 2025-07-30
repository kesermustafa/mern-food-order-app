'use client'

import React, {useState, useEffect} from 'react';
import Image from "next/image";
import Title from "@/src/app/components/Title";
import ExtrasSelector from "@/src/app/components/ExtraSelected";
import {useParams} from "next/navigation";
import useCartStore from "@/src/app/redux/store/cartStore";
import {EXTRAS} from "@/src/app/data/extras";

const ProductDetailPage = ({food}) => {
    const {addProduct} = useCartStore();
    const [prices] = useState([10, 20, 30]);
    const [basePrice, setBasePrice] = useState(prices[0]);
    const [size, setSize] = useState(0);
    const [optionsItem, setOptionsItem] = useState([]);
    const [extrasPrice, setExtrasPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(prices[0]);

    // Update total price when base price or extras change
    useEffect(() => {
        setTotalPrice(basePrice + extrasPrice);
    }, [basePrice, extrasPrice]);

    const handleSize = (sizeIndex) => {
        setSize(sizeIndex);
        setBasePrice(prices[sizeIndex]);
    };

    const handleAddToCart = () => {
        const selectedExtrasDetails = EXTRAS.filter(extra =>
            optionsItem.includes(extra.id)
        );

        const product = {
            id: `${id}-${size}-${optionsItem.join(',')}`,
            name: food?.name || "Pizza",
            price: totalPrice,
            size: ['Small', 'Medium', 'Large'][size],
            extras: selectedExtrasDetails,
            quantity: 1,
            image: food?.image || "/images/f1.png"
        };

        addProduct(product);
        resetForm();
    };

    const resetForm = () => {
        setSize(0);
        setBasePrice(prices[0]);
        setOptionsItem([]); // This will reset the ExtrasSelector
        setExtrasPrice(0);
        setTotalPrice(prices[0]);
    };

    const params = useParams();
    const {id} = params;

    return (
        <div className={'w-full min-h-[calc(100vh-80px)] flex items-center justify-center'}>
            <div className={'container mx-auto py-10 flex max-lg:gap-10 flex-col lg:flex-row flex-wrap'}>
                <div className={'flex flex-5 items-center justify-center'}>
                    <div className={'relative flex w-72 h-72 md:w-96 md:h-96'}>
                        <Image
                            src={'/images/f1.png'}
                            alt={`${id}'li urun image`}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>

                <div className={'flex-7 px-4 flex gap-6 flex-col items-center justify-center'}>
                    <Title title={'Product Details'} desing={'font-dancing font-extrabold text-4xl text-amber-600'}/>

                    <div className={'flex w-full flex-col gap-3'}>
                        <span className={'text-sm font-dancing text-amber-700 font-bold'}>
                            $ <span className={'text-2xl font-[900]'}>{totalPrice.toFixed(2)}</span>
                        </span>
                        <p className={'font-exo text-gray-700 text-base text-justify leading-relaxed'}>
                            {food?.description || "With a focus on fresh ingredients and authentic flavors..."}
                        </p>
                    </div>

                    <div className={'w-full'}>
                        <h2 className={'text-xl font-semibold mb-2'}>Choose the size</h2>
                        <div className={'flex gap-14 md:gap-20 w-full items-center justify-start'}>
                            {['Small', 'Medium', 'Large'].map((sizeName, index) => (
                                <div
                                    key={sizeName}
                                    onClick={() => handleSize(index)}
                                    className={`relative cursor-pointer hover:scale-105 transition-all ${size === index ? 'ring-2 ring-amber-500 rounded-lg' : ''}`}
                                >
                                    <Image
                                        src={"/images/size.png"}
                                        alt={`${sizeName.toLowerCase()} size`}
                                        width={50 + (index * 25)}
                                        height={50 + (index * 25)}
                                    />
                                    <span
                                        className={`absolute top-0 ${index === 1 ? '-right-10' : '-right-8'} font-semibold bg-amber-400 rounded-full text-sm px-2`}>
                                        {sizeName}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <ExtrasSelector
                        setOptionsItem={setOptionsItem}
                        setExtrasPrice={setExtrasPrice}
                        extras={EXTRAS}
                        selectedExtras={optionsItem}
                    />

                    <button
                        onClick={handleAddToCart}
                        className="w-full max-w-96 px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;