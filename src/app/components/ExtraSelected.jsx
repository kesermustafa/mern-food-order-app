'use client'

import React from 'react';
import {Check} from 'lucide-react';

export default function ExtrasSelector({setOptionsItem, setExtrasPrice, extras, selectedExtras}) {
    // Calculate total price of selected extras
    const currentExtrasTotal = (selectedExtras || []).reduce((sum, extraId) => {
        const extra = extras.find(e => e.id === extraId);
        return sum + (extra ? extra.price : 0);
    }, 0);

    // Update parent when extras change
    React.useEffect(() => {
        setExtrasPrice(currentExtrasTotal);
    }, [currentExtrasTotal, setExtrasPrice]);

    const handleExtraToggle = (extraId) => {
        const newSelected = selectedExtras.includes(extraId)
            ? selectedExtras.filter(id => id !== extraId)
            : [...selectedExtras, extraId];
        setOptionsItem(newSelected);
    };

    return (
        <div className="w-full max-w-4xl mx-auto rounded-2xl">
            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    Choose additional ingredients
                </h2>
                <p className="text-gray-600">
                    Choose sauces that complement your taste
                </p>
                {selectedExtras.length > 0 && (
                    <div className="mt-3 text-sm text-amber-600">
                        {selectedExtras.length} additional material selected - Total: ${currentExtrasTotal.toFixed(2)}
                    </div>
                )}
            </div>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4">
                {extras.map((extra) => {
                    const isSelected = selectedExtras.includes(extra.id);
                    return (
                        <div
                            key={extra.id}
                            className={`min-w-[150px] relative group cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                                isSelected ? 'scale-105' : ''
                            }`}
                            onClick={() => handleExtraToggle(extra.id)}
                        >
                            <div
                                className={`relative overflow-hidden rounded-2xl border-2 px-2 py-1 text-center flex items-center gap-1
                                    ${isSelected
                                    ? `${extra.color} border-transparent text-white shadow-xl`
                                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-100'
                                }
                                  transition-all duration-300
                                `}
                            >
                                {isSelected && (
                                    <div
                                        className="absolute top-1 right-1 w-4 h-4 rounded-full flex items-center justify-center">
                                        <Check size={16} className="text-green-600"/>
                                    </div>
                                )}

                                <div className="relative">
                                    <div
                                        className={`text-xl transition-all duration-300 ${isSelected ? 'transform scale-105' : ''}`}>
                                        {extra.emoji}
                                    </div>
                                    {isSelected && (
                                        <div className="absolute inset-0 bg-white/10 rounded-full blur-xl"></div>
                                    )}
                                </div>

                                <h3 className="text-sm text-nowrap">{extra.name}</h3>
                            </div>
                        </div>
                    );
                })}
            </div>

            {selectedExtras.length > 0 && (
                <div className="mt-8 p-4 bg-amber-50 rounded-xl border border-amber-200">
                    <h4 className="font-semibold text-amber-800 mb-2">
                        Selected Additional Materials (Total: ${currentExtrasTotal.toFixed(2)})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {selectedExtras.map(extraId => {
                            const extra = extras.find(e => e.id === extraId);
                            return (
                                <span
                                    key={extraId}
                                    className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-sm font-medium"
                                >
                                    <span className="mr-1">{extra.emoji}</span>
                                    {extra.name} (${extra.price.toFixed(2)})
                                </span>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}