'use client'

import React, {useState} from 'react';
import {Check} from 'lucide-react';

export default function ExtrasSelector() {
    const [selectedExtras, setSelectedExtras] = useState([]);

    const extras = [{
        id: 'ketcap', name: 'Ketchup', emoji: '🍅', color: 'bg-red-500', description: 'Klasik domates ketçabı'
    }, {
        id: 'mayonez', name: 'Mayonnaise', emoji: '🥄', color: 'bg-yellow-500', description: 'Kremsi mayonez'
    }, {
        id: 'sos', name: 'Hot Sauce', emoji: '🌶️', color: 'bg-red-600', description: 'Baharatlı acı sos'
    }, {
        id: 'hardal', name: 'Mustard', emoji: '🟡', color: 'bg-yellow-600', description: 'Fransız hardal'
    }, {
        id: 'ranch', name: 'Ranch', emoji: '🥗', color: 'bg-green-500', description: 'Kremalı ranch sos'
    }, {
        id: 'barbekü', name: 'Barbecue', emoji: '🔥', color: 'bg-orange-600', description: 'Dumanlı barbekü sos'
    }];

    const handleExtraToggle = (extraId) => {
        setSelectedExtras(prev => prev.includes(extraId) ? prev.filter(id => id !== extraId) : [...prev, extraId]);
    };

    return (<div className="w-full max-w-4xl mx-auto  rounded-2xl ">
        <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Choose additional ingredients</h2>
            <p className="text-gray-600">Choose sauces that complement your taste</p>
            {selectedExtras.length > 0 && (<div className="mt-3 text-sm text-amber-600">
                {selectedExtras.length} additional material selected
            </div>)}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-2">
            {extras.map((extra) => {
                const isSelected = selectedExtras.includes(extra.id);
                return (<div
                    key={extra.id}
                    className={`relative group cursor-pointer transition-all duration-300 transform hover:scale-105 ${isSelected ? 'scale-105' : ''}`}
                    onClick={() => handleExtraToggle(extra.id)}
                >
                    <div className={`
                relative overflow-hidden rounded-2xl border-2 px-2 py-1 text-center flex items-center gap-1
                ${isSelected ? `${extra.color} border-transparent text-white shadow-xl` : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-100'}
                transition-all duration-300
              `}>
                        {/* Seçili durumu için check ikonu */}
                        {isSelected && (<div
                            className="absolute top-1 right-1 w-4 h-4  rounded-full flex items-center justify-center">
                            <Check size={16} className="text-green-600"/>
                        </div>)}

                        {/* Emoji ve glow efekti */}
                        <div className="relative ">
                            <div className={`
                    text-xl transition-all duration-300
                    ${isSelected ? 'transform scale-105' : ''}
                  `}>
                                {extra.emoji}
                            </div>
                            {isSelected && (
                                <div className="absolute inset-0 bg-white/10 rounded-full blur-xl"></div>)}
                        </div>

                        <h3 className="text-sm text-nowrap">{extra.name}</h3>
                        {/* Hover efekti için gradient */}
                        <div className={`
                  absolute inset-0 bg-gradient-to-r ${extra.color} opacity-0 rounded-2xl
                  ${!isSelected ? 'group-hover:opacity-10' : ''}
                  transition-opacity duration-300
                `}>

                        </div>
                    </div>
                </div>);
            })}
        </div>

        {/* Seçim özeti */}
        {selectedExtras.length > 0 && (<div className="mt-8 p-4 bg-amber-50 rounded-xl border border-amber-200">
            <h4 className="font-semibold text-amber-800 mb-2">Selected Additional Materials</h4>
            <div className="flex flex-wrap gap-2">
                {selectedExtras.map(extraId => {
                    const extra = extras.find(e => e.id === extraId);
                    return (<span
                        key={extraId}
                        className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-sm font-medium"
                    >
                  <span className="mr-1">{extra.emoji}</span>
                        {extra.name}
                </span>);
                })}
            </div>
        </div>)}

        {/* Aksiyon butonları */}
        <div className="flex justify-between items-center mt-8">
            <button
                onClick={() => setSelectedExtras([])}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                disabled={selectedExtras.length === 0}
            >
                Clean all
            </button>
            <button
                className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
                Next
            </button>
        </div>
    </div>);
}