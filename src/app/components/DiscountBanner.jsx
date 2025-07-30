"use client"

import React, {useState, useEffect} from 'react';
import {ShoppingCart, Percent, Clock} from 'lucide-react';
import Link from "next/link";

const DiscountBanner = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [timeLeft, setTimeLeft] = useState({hours: 23, minutes: 45, seconds: 30});

    // Geri sayım sayacı
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) {
                    return {...prev, seconds: prev.seconds - 1};
                } else if (prev.minutes > 0) {
                    return {...prev, minutes: prev.minutes - 1, seconds: 59};
                } else if (prev.hours > 0) {
                    return {hours: prev.hours - 1, minutes: 59, seconds: 59};
                }
                return prev;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div
            className="relative max-w-5xl mb-16 mx-auto overflow-hidden bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-2xl shadow-2xl my-6 transform hover:scale-105 transition-all duration-300">
            {/* Animasyonlu arka plan efekti */}
            <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-20 animate-pulse"></div>

            {/* Ana içerik */}
            <div className="relative p-6 text-white">


                <div className="flex items-center justify-between">
                    {/* Sol taraf - İndirim bilgisi */}
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
                                <Percent className="w-6 h-6"/>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold tracking-tight">
                                    EKSTRA %10 İNDİRİM
                                </h3>
                                <p className="text-white/90 text-sm">
                                    Sepetinize eklenen tüm ürünlerde geçerli!
                                </p>
                            </div>
                        </div>

                        {/* Geri sayım */}
                        <div className="flex items-center gap-2 mt-4">
                            <Clock className="w-4 h-4"/>
                            <span className="text-sm font-medium">Kampanya bitiş süresi:</span>
                            <div className="flex gap-1 ml-2">
                <span className="bg-white/20 px-2 py-1 rounded text-xs font-bold min-w-[2rem] text-center">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                                <span className="text-xs self-center">:</span>
                                <span
                                    className="bg-white/20 px-2 py-1 rounded text-xs font-bold min-w-[2rem] text-center">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                                <span className="text-xs self-center">:</span>
                                <span
                                    className="bg-white/20 px-2 py-1 rounded text-xs font-bold min-w-[2rem] text-center">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                            </div>
                        </div>
                    </div>

                    {/* Sağ taraf - CTA butonu */}
                    <div className="ml-6">
                        <Link href={"/order-basket"}
                              className="group bg-white text-red-500 px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-2">
                            <ShoppingCart className="w-5 h-5 group-hover:animate-bounce"/>
                            Sepete Git
                        </Link>
                    </div>
                </div>

                {/* Alt bilgi */}
                <div className="mt-4 pt-4 border-t border-white/20">
                    <p className="text-xs text-white/80">
                        * Bu kampanya sadece bugün geçerlidir. Minimum sipariş tutarı 50₺'dir.
                    </p>
                </div>
            </div>

            {/* Dekoratif elementler */}
            <div
                className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20 animate-ping"></div>
            <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-white rounded-full opacity-10"></div>
        </div>
    );
};

export default DiscountBanner;