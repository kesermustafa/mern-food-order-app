"use client"

import React, {useEffect, useState} from 'react';
import Title from "@/src/app/components/Title";
import customerReviews from "@/src/app/utils/customers";
import Reviews from "@/src/app/components/Reviews";
import {ChevronLeft, ChevronRight} from 'lucide-react';

const CustomersReview = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    // Calculate total slides (each slide shows 2 reviews)
    const totalSlides = Math.ceil(customerReviews.length / 2);

    // Auto-slide functionality
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isAnimating) {
                nextSlide();
            }
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, [currentSlide, isAnimating]);

    const nextSlide = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
        setTimeout(() => setIsAnimating(false), 500);
    };

    const prevSlide = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
        setTimeout(() => setIsAnimating(false), 500);
    };

    const goToSlide = (index) => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentSlide(index);
        setTimeout(() => setIsAnimating(false), 500);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="h-24"></div>

            {/* Title */}
            <div className="text-center mb-16">
                <Title
                    desing="text-5xl text-amber-600 font-bold"
                    title="Our Customers' Comments"
                />
            </div>

            {/* Slider Container */}
            <div className="relative max-w-7xl mx-auto">
                {/* Reviews Container */}
                <div className="overflow-hidden">
                    <div
                        className={`flex transition-transform duration-500 ease-in-out ${
                            isAnimating ? 'pointer-events-none' : ''
                        }`}
                        style={{transform: `translateX(-${currentSlide * 100}%)`}}
                    >
                        {Array.from({length: totalSlides}, (_, slideIndex) => (
                            <div key={slideIndex} className="w-full md:px-8 flex-shrink-0">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-0 px-4">
                                    {customerReviews
                                        .slice(slideIndex * 2, slideIndex * 2 + 2)
                                        .map((customer) => (
                                            <div key={customer.id} className="flex max-w-md gap-4 w-full mx-auto   ">
                                                <Reviews customer={customer}/>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation Buttons */}
                <button
                    onClick={prevSlide}
                    disabled={isAnimating}
                    className="absolute left-4 top-1/2 cursor-pointer -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                    <ChevronLeft className="w-6 h-6 text-amber-600 group-hover:scale-110 transition-transform"/>
                </button>

                <button
                    onClick={nextSlide}
                    disabled={isAnimating}
                    className="absolute right-4 cursor-pointer top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                    <ChevronRight className="w-6 h-6 text-amber-600 group-hover:scale-110 transition-transform"/>
                </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
                {Array.from({length: totalSlides}, (_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        disabled={isAnimating}
                        className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                            currentSlide === index
                                ? 'bg-amber-600 scale-125'
                                : 'bg-gray-300 hover:bg-gray-400'
                        } disabled:cursor-not-allowed`}
                    />
                ))}
            </div>

            {/* Progress Bar */}
            <div className="max-w-xs mx-auto mt-6">
                <div className="bg-gray-200 rounded-full h-1">
                    <div
                        className="bg-amber-600 h-1 rounded-full transition-all duration-300"
                        style={{width: `${((currentSlide + 1) / totalSlides) * 100}%`}}
                    />
                </div>

            </div>
        </div>
    );
};

export default CustomersReview;
