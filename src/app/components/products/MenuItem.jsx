import React, {useState} from 'react';
import {ShoppingCart, Star, Heart, Plus, Minus} from "lucide-react";
import Image from "next/image";
import useCartStore from "@/src/app/redux/store/cartStore";
import useFavoritesStore from "@/src/app/redux/store/useFavoritesStore";
import Link from "next/link";

const MenuItem = () => {

    const addProduct = useCartStore((state) => state.addProduct);

    const [quantity, setQuantity] = useState(1);
    const [isHovered, setIsHovered] = useState(false);

    const {favorites, addFavorite, removeFavorite} = useFavoritesStore();
    const isFavorite = favorites.some((fav) => fav.id === "pizza-1");

    const toggleFavorite = () => {
        const product = {
            id: "pizza-1",
            name: "Delicious Margherita Pizza",
            image: "/images/pizza-400.jpg",
            price,
        };

        if (isFavorite) {
            removeFavorite(product.id);
        } else {
            addFavorite(product);
        }
    };

    const price = 25;
    const oldPrice = (price * 1.17).toFixed(2);

    const handleQuantityChange = (change) => {
        setQuantity(prev => Math.max(1, prev + change));
    };

    const handleAddToCart = () => {
        const product = {
            id: "pizza-1", // benzersiz olmalı
            name: "Delicious Margherita Pizza",
            price: price * quantity, // toplam fiyat
            quantity: quantity,
            image: "/images/pizza-400.jpg",
        };

        addProduct(product);
        console.log(`Added ${quantity} items to cart`);
    };

    return (
        <div
            className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group border border-gray-200"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Favorite Button */}
            <button
                onClick={toggleFavorite}
                className="absolute top-4 right-4 z-20 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
            >
                <Heart
                    className={`w-5 h-5 transition-all duration-300 ${
                        isFavorite ? 'text-red-500 fill-current' : 'text-gray-400 hover:text-red-400'
                    }`}
                />
            </button>


            {/* Discount Badge */}
            <div
                className="absolute top-4 left-4 z-20 bg-gradient-to-r from-amber-400 to-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                15% OFF
            </div>

            {/* Image Section */}
            <Link href={"/product/1"} className="relative p-6 bg-gradient-to-br from-gray-50 to-gray-100">
                <div
                    className={`relative w-full h-48 transition-all duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}>
                    <div
                        className="w-full h-full rounded-full flex items-center justify-center overflow-hidden shadow-inner">
                        <div
                            className="w-40 h-40 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            <div
                                className={'relative mt-4 w-48 h-44 hover:scale-105 transition-all duration-500 rounded-full overflow-hidden mx-auto'}>
                                <Image src={'/images/pizza-400.jpg'}
                                       alt={"image"}
                                       fill
                                       sizes="(max-width: 768px) 100vw, 50vw"
                                       className="object-cover "
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </Link>

            {/* Content Section */}
            <div className="p-6 space-y-4">
                {/* Rating */}
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                className={`w-4 h-4 ${
                                    star <= 4 ? 'text-amber-400 fill-current' : 'text-gray-300'
                                }`}
                            />
                        ))}
                    </div>
                    <span className="text-sm font-medium text-gray-700">4.9</span>
                    <span className="text-xs text-gray-500">(124 reviews)</span>
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-gray-800 leading-tight">
                    Delicious Margherita Pizza
                </h2>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed">
                    Fresh tomatoes, mozzarella cheese, basil leaves on crispy thin crust
                </p>

                {/* Price Section */}
                <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-gray-800">
                        ${price}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                        ${oldPrice}
                    </span>
                    <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                        Save ${(oldPrice - price).toFixed(2)}
                    </span>
                </div>

                {/* Quantity and Add to Cart */}
                <div className="flex items-center justify-between pt-2">
                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700">Qty:</span>
                        <div className="flex items-center bg-gray-100 rounded-lg">
                            <button
                                onClick={() => handleQuantityChange(-1)}
                                className="p-2 hover:bg-gray-200 transition-colors duration-200 rounded-l-lg"
                                disabled={quantity <= 1}
                            >
                                <Minus className="w-4 h-4 text-gray-600"/>
                            </button>
                            <span className="px-4 py-2 font-medium text-gray-800 min-w-[3rem] text-center">
                                {quantity}
                            </span>
                            <button
                                onClick={() => handleQuantityChange(1)}
                                className="p-2 hover:bg-gray-200 transition-colors duration-200 rounded-r-lg"
                            >
                                <Plus className="w-4 h-4 text-gray-600"/>
                            </button>
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                        onClick={handleAddToCart}
                        className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                        <ShoppingCart className="w-5 h-5"/>
                    </button>
                </div>

                {/* Total Price */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                    <span className="text-sm font-medium text-gray-700">Total:</span>
                    <span className="text-lg font-bold text-gray-800">
                        ${(price * quantity).toFixed(2)}
                    </span>
                </div>
            </div>

            {/* Hover Effect Overlay */}
            <div
                className={`absolute inset-0 bg-gradient-to-t from-amber-500/5 to-transparent pointer-events-none transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}/>
        </div>
    );
};

export default MenuItem;