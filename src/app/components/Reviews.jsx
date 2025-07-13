import React from 'react';

const Reviews = ({customer}) => {
    return (
        <div
            className="w-[600px] mx-auto bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6">

            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-1">
                    {Array.from({length: customer.rating}, (_, i) => (
                        <svg
                            key={i}
                            className="w-5 h-5 text-yellow-400 fill-current"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                    ))}
                    {Array.from({length: 5 - customer.rating}, (_, i) => (
                        <svg
                            key={i}
                            className="w-5 h-5 text-gray-300 fill-current"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                    ))}
                </div>
            </div>

            {/* Comment Section */}
            <div className="mb-6 h-12">
                <p className="text-gray-200 leading-relaxed text-sm italic">
                    "{customer.comment}"
                </p>
            </div>

            {/* Customer Info */}
            <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
                <div className="relative">
                    <img
                        src={customer.avatar}
                        alt={customer.fullName}
                        className="w-14 h-14 p-[2px] border-2 border-amber-500 rounded-full object-cover ring-2 ring-blue-100"
                    />
                    <div
                        className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex-1">
                    <h4 className="font-semibold text-gray-200 text-sm">{customer.fullName}</h4>
                    <p className="text-xs text-gray-400">Verified Customer</p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-gray-300">
                        {new Date().toLocaleDateString('tr-TR', {
                            day: 'numeric',
                            month: 'short'
                        })}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Reviews;