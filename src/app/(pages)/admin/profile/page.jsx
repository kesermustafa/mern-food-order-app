"use client"
import React, {useState} from 'react';
import Image from "next/image";

import {useRouter} from "next/navigation";
import {PictureInPicture2, HandPlatter, Utensils, ChartBarStacked, LogOut} from "lucide-react";
import Products from "@/src/app/components/admin/Products";
import Orders from "@/src/app/components/admin/Orders";
import Footer from "@/src/app/components/admin/Footer";
import Categories from "@/src/app/components/admin/Categories";

const page = () => {
    const [activeTab, setActiveTab] = useState(0);
    const router = useRouter();

    const handleSignOut = () => {
        if (confirm("Çıkış yapmak istediğinizden emin misiniz?")) {
            router.push("/auth/login");
        }
    };

    const menuItems = [
        {id: 0, icon: Utensils, label: "Products", color: "from-amber-700 to-amber-500"},
        {id: 1, icon: HandPlatter, label: "Orders", color: "from-purple-500 to-purple-600"},
        {id: 2, icon: ChartBarStacked, label: "Categories", color: "from-green-500 to-green-600"},
        {id: 3, icon: PictureInPicture2, label: "Footer", color: "from-orange-500 to-orange-600"},

    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 0:
                return (<Products/>);
            case 1:
                return (
                    <Orders/>
                );
            case 2:
                return (
                    <Categories/>
                );
            case 3:
                return (
                    <Footer/>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="lg:w-80 ">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            {/* Profile Header */}
                            <div className="bg-gradient-to-t from-gray-600 to-gray-900 p-6 text-white">
                                <div className="flex flex-col items-center">
                                    <div
                                        className="relative bg-white w-20 h-20 rounded-full overflow-hidden  mb-3">
                                        <Image
                                            src="/images/admin.png"
                                            alt="profile image"
                                            fill
                                            sizes="80px"
                                            priority
                                            className="object-cover "
                                        />
                                    </div>
                                    <h2 className="font-bold font-exo text-xl">Admin</h2>
                                    <p className="text-blue-100 text-sm">Project Manager</p>
                                </div>
                            </div>

                            {/* Navigation Menu */}
                            <div className="p-4">
                                <ul className="space-y-2 font-exo">
                                    {menuItems.map((item) => {
                                        const IconComponent = item.icon;
                                        return (
                                            <li key={item.id}>
                                                <button
                                                    onClick={() => setActiveTab(item.id)}
                                                    className={`w-full cursor-pointer flex items-center gap-3 p-4 rounded-xl transition-all duration-300 text-left group ${
                                                        activeTab === item.id
                                                            ? `bg-gradient-to-r ${item.color} text-white shadow-lg transform scale-105`
                                                            : "hover:bg-gray-50 text-gray-700 hover:text-gray-900"
                                                    }`}
                                                >
                                                    <IconComponent
                                                        className={`text-lg transition-transform group-hover:scale-110 ${
                                                            activeTab === item.id ? "text-white" : "text-gray-500"
                                                        }`}
                                                    />
                                                    <span className="font-medium">{item.label}</span>
                                                    {activeTab === item.id && (
                                                        <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                                                    )}
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ul>

                                {/* Sign Out Button */}
                                <button
                                    onClick={handleSignOut}
                                    className="w-full cursor-pointer flex font-exo items-center gap-3 p-4 rounded-xl mt-4 text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-300 group"
                                >
                                    <LogOut className="text-lg transition-transform group-hover:scale-110"/>
                                    <span className="font-medium">Logout</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="bg-transparent">
                            {renderTabContent()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;
