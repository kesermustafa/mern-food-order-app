import React from 'react';
import {HandPlatter, Utensils} from "lucide-react";

const Orders = () => {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">

                <div className="flex items-center gap-2">
                    <span
                        className='bg-gray-100 border-2 border-amber-600 p-4 rounded-full flex items-center justify-center'>
                         <HandPlatter size={32} className="text-amber-600 "/>
                    </span>
                    <h3 className="text-4xl font-dancing font-semibold text-amber-600 ">
                        Orders
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default Orders;
