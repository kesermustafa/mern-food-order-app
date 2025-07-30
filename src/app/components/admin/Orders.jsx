import React from 'react';
import {HandPlatter, Utensils} from "lucide-react";

const orders = [
    {
        id: "6641f465-9c97-480b-b155-f2955de4507f",
        customer: "Mustafa Keser",
        totalPrice: 10,
        payment: "Cash",
        status: "pending",
    }, {
        id: "e046981d-a1dd-4247-baa7-a85d5d719f2b",
        customer: "John Dou",
        totalPrice: 17,
        payment: "Cash",
        status: "pending",
    }, {
        id: "84207c94-6603-4c05-8dd6-dd7537cb3125",
        customer: "Sara White",
        totalPrice: 22,
        payment: "Cash",
        status: "pending",
    },
];

const MobileProductCard = ({order, index}) => (
    <div
        className={`rounded-xl font-exo mb-4 overflow-hidden shadow-sm border ${index % 2 === 0 ? 'bg-white border-gray-200' : 'bg-gray-50 border-gray-300'}`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-600 px-4 py-2 flex justify-between items-center">
            <span className="text-white font-semibold text-sm">Order #{index + 1}</span>
            <span className="text-gray-100 text-xs">ID: {order.id}</span>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
            {/* Customer and Price Section */}
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <div className="text-xs text-gray-500 font-medium mb-1">CUSTOMER</div>
                    <h3 className="font-bold text-gray-900 text-lg leading-tight">
                        {order.customer}
                    </h3>
                </div>
                <div className="text-right">
                    <div className="text-xs text-gray-500 font-medium mb-1">TOTAL</div>
                    <span className="text-xl font-bold text-green-600">
                        ${order.totalPrice}
                    </span>
                </div>
            </div>

            {/* Payment and Status Section */}
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <div className="text-xs text-gray-500 font-medium mb-1">PAYMENT</div>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {order.payment}
                    </span>
                </div>
                <div className="text-center">
                    <div className="text-xs text-gray-500 font-medium mb-1">STATUS</div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                'bg-gray-100 text-gray-800'
                    }`}>
                        {order.status}
                    </span>
                </div>
            </div>

            {/* Action Section */}
            <div className="flex justify-center pt-3 border-t border-gray-200">
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg">
                    <span className="text-sm">NEXT...</span>
                </button>
            </div>
        </div>
    </div>
);

const DesktopProductRow = ({order, index}) => (
    <tr className={`h-12 hover:bg-gray-600 hover:text-white ${index % 2 === 0 ? 'bg-gray-400 ' : 'bg-gray-200 '}`}>
        <td className="w-16 text-center">{index + 1}</td>
        <td className="min-w-12 text-sm truncate overflow-hidden max-w-[50px] pr-4">{order.id}</td>
        <td className="min-w-16 text-nowrap">
            {order.customer}
        </td>
        <td className="min-w-24 text-center font-semibold">${order.totalPrice}</td>
        <td className="min-w-24 text-center">{order.payment}</td>
        <td className="min-w-24 text-center">{order.status}</td>
        <td className="min-w-24 text-center">
            <span className="text-sm bg-green-600 px-2 py-1 rounded-md text-white cursor-pointer">NEXT...</span>
        </td>
    </tr>
);

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

                <div className="w-full h-full md:flex md:gap-4 overflow-hidden mt-8 rounded">

                    <div className="md:hidden space-y-2">
                        {orders.map((order, index) => (
                            <MobileProductCard
                                key={order.id}
                                order={order}
                                index={index}
                            />
                        ))}
                    </div>

                    {/* Desktop View - Table Layout (unchanged) */}
                    <div className="hidden md:flex-1 md:block overflow-x-auto">
                        <table className="w-full text-left font-exo">
                            <thead>
                            <tr className="bg-gray-700 text-md text-gray-200 h-12">
                                <th className="w-16 text-center">#</th>
                                <th className={'max-w-32 text-nowrap'}>PRODUCT ID</th>
                                <th>CUSTOMER</th>
                                <th className="w-28 text-center">TOTAL</th>
                                <th className="w-28 text-center">PAYMENT</th>
                                <th className="w-28 text-center">STATUS</th>
                                <th className="w-28 text-center text-nowrap">ACTION</th>
                            </tr>
                            </thead>
                            <tbody>
                            {orders.map((order, index) => (
                                <DesktopProductRow
                                    key={order.id}
                                    order={order}
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

export default Orders;