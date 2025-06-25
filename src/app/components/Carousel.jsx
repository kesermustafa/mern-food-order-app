"use client"

import React, {useMemo, useRef, useState} from 'react';
import Image from "next/image";
import hero from '@/public/images/hero.jpg';
import heroImageMini from '@/public/images/hero-bg-mini.jpg';
import Title from "@/src/app/components/Title";
import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {usePathname} from "next/navigation";

const Carousel = () => {
    const Slider = dynamic(() => import("react-slick"), {ssr: false});
    const pathname = usePathname();
    const [isReady, setIsReady] = useState(false);
    const sliderRef = useRef(null);

    // Slide içeriği - statik data
    const slideContent = useMemo(() => [
        {
            id: 1,
            title: "Fast Food Restaurant",
            text: "From carefully crafted recipes to unforgettable flavors, we bring you dishes made with passion, quality, and a touch of elegance. Whether you're craving something classic or bold, every bite tells a story of authenticity, freshness, and pure delight."
        },
        {
            id: 2,
            title: "All the flavors you like",
            text: "Discover the perfect balance of taste, tradition, and creativity. Our kitchen is where fresh ingredients meet skilled hands, delivering meals that are as comforting as they are unforgettable. Welcome to a place where food means joy."
        }
    ], []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 30000,
        appendDots: (dots) => (
            <div className={"container "}>
                <ul className="container ml-5 !mx-auto w-full text-start">{dots}</ul>
            </div>
        ),
        customPaging: (i) => (
            <div className="w-3 h-3 ml-5 border bg-amber-100 rounded-full mt-10"></div>
        ),
    };

    return (
        <div className={'h-screen w-full overflow-hidden relative'}>

            <div className="absolute bottom-0 left-0 right-0 w-full h-1/5 bg-gradient-to-t from-white/95 to-transparent z-10"></div>

            <div className={'w-full h-full absolute top-0 left-0'}>
                <Image
                    src={hero}
                    alt="Hero image for desktop"
                    fill
                    className={`object-cover hidden lg:block float-animation`}
                    priority
                    sizes="(max-width: 768px) 100vw, 1200px"
                    quality={85}
                />
                <Image
                    src={heroImageMini}
                    alt="Hero image for tablet"
                    fill
                    className={`object-cover hidden md:block lg:hidden float-animation`}
                    priority
                    sizes="(max-width: 768px) 100vw, 1200px"
                    quality={80}
                />
                <Image
                    src={heroImageMini}
                    alt="Hero image for mobile"
                    fill
                    className={`object-cover md:hidden float-animation`}
                    priority
                    sizes="(max-width: 768px) 100vw, 1200px"
                    quality={75}
                />
            </div>

            {/* Slider */}
            <div className="relative !container mx-auto -mt-40 lg:-mt-10 z-10 h-full flex items-center justify-center">
                <Slider {...settings} className="w-full">
                    <div>
                        <div className="container lg:w-2/6 w-[90%] sm:w-[70%] text-white flex flex-col items-start text-center gap-y-8 px-4">
                            <Title title="Fast Food Restaurant" desing={'text-4xl  text-amber-700 mx-auto'} />
                            <p className={`text-md font-roboto ${pathname === "/" ? "lg:text-gray-700" : "text-white"} `}>
                                From carefully crafted recipes to unforgettable flavors, we bring you dishes made with
                                passion, quality, and a touch of elegance. Whether you're craving something classic or
                                bold, every bite tells a story of authenticity, freshness, and pure delight. Taste the
                                difference—because good food is never just about eating.
                            </p>
                            <button className="rounded-full cursor-pointer px-5 py-1 text-sm font-semibold bg-amber-500 hover:bg-amber-600 transition-colors">
                                Order Now
                            </button>
                        </div>
                    </div>

                    <div>
                        <div className="container lg:w-2/6 w-[90%] sm:w-[70%] text-white flex flex-col items-start text-center gap-y-8 px-4">
                            <Title title="All The Flavors You Like" desing={'text-4xl  text-amber-700 mx-auto'} />
                            <p className={`text-md font-roboto ${pathname === "/" ? "lg:text-gray-700" : "text-white"} `}>
                                Discover the perfect balance of taste, tradition, and creativity. Our kitchen is where
                                fresh ingredients meet skilled hands, delivering meals that are as comforting as they
                                are unforgettable. Welcome to a place where food means joy.
                            </p>
                            <button className="rounded-full cursor-pointer px-5 py-1 text-sm font-semibold bg-amber-500 hover:bg-amber-600 transition-colors">
                                Order Now
                            </button>
                        </div>
                    </div>
                </Slider>
            </div>
        </div>
    );
};

export default Carousel;