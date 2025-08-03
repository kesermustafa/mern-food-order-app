'use client';
import React, {useEffect, useState} from "react";
import Image from "next/image";
import {signOut} from "next-auth/react";
import {useRouter} from "next/navigation";

import {
    FaBell,
    FaShieldAlt
} from "react-icons/fa";

import {HandPlatter, UserRoundCog, KeyRound, BellRing, ShieldUser, LogOut} from 'lucide-react';

import AccountInformation from "@/src/app/components/AccountInformation";
import PasswordChange from "@/src/app/components/PasswordChange";
import {fetchWithAuth} from "@/src/app/utils/fetchWithAuth";
import {encryptStorage} from "@/src/app/utils/encryptStorage";
import {toast} from "react-toastify";

const ProfileClient = ({userId}) => {

    const [activeTab, setActiveTab] = useState(0);
    const router = useRouter();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadUser() {
            try {
                const data = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`);
                setUser(data.user);
            } catch (err) {
                console.error("Kullanıcı verisi alınamadı:", err);
                setError(err.message || "Bir hata oluştu.");
            } finally {
                setLoading(false);
            }
        }

        loadUser();
    }, []);

    const handleSignOut = () => {
        if (confirm("Çıkış yapmak istediğinizden emin misiniz?")) {
            if (encryptStorage) {
                encryptStorage.removeItem("token");
            } else {
                if (typeof window !== "undefined") {
                    localStorage.removeItem("token");
                }
            }

            signOut({callbackUrl: "/"}).then(() => {
                toast.success("Başarıyla çıkış yapıldı.");
            });
        }
    };

    const menuItems = [
        {id: 0, icon: UserRoundCog, label: "Account Information", color: "from-amber-700 to-amber-500"},
        {id: 1, icon: KeyRound, label: "Change Password", color: "from-purple-500 to-purple-600"},
        {id: 2, icon: HandPlatter, label: "My Orders", color: "from-green-500 to-green-600"},
        {id: 3, icon: BellRing, label: "Notifications", color: "from-orange-500 to-orange-600"},
        {id: 4, icon: ShieldUser, label: "Security Settings", color: "from-red-500 to-red-600"}
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 0:
                return (<AccountInformation user={user}/>);
            case 1:
                return (
                    <PasswordChange/>
                );
            case 2:
                return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <HandPlatter className="text-green-500 w-10 h-10 "/>
                            Siparişlerim
                        </h3>
                        {[1, 2, 3].map((order) => (
                            <div key={order}
                                 className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h4 className="font-semibold text-gray-800">Sipariş #{order}001</h4>
                                        <p className="text-sm text-gray-600">Tarih: 15 Temmuz 2025</p>
                                    </div>
                                    <span
                                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                        Teslim Edildi
                                    </span>
                                </div>
                                <div className="border-t pt-3">
                                    <p className="text-sm text-gray-600">Pizza Margherita x2</p>
                                    <p className="font-semibold text-gray-800">₺85.00</p>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case 3:
                return (
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FaBell className="text-orange-500"/>
                            Bildirim Ayarları
                        </h3>
                        <div className="space-y-4">
                            {[
                                {title: "Sipariş Bildirimleri", desc: "Sipariş durumu güncellemeleri"},
                                {title: "Promosyon E-postaları", desc: "Özel teklifler ve kampanyalar"},
                                {title: "SMS Bildirimleri", desc: "Hızlı sipariş güncellemeleri"}
                            ].map((item, index) => (
                                <div key={index}
                                     className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <h4 className="font-medium text-gray-800">{item.title}</h4>
                                        <p className="text-sm text-gray-600">{item.desc}</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" defaultChecked={index !== 1}/>
                                        <div
                                            className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FaShieldAlt className="text-red-500"/>
                            Güvenlik Ayarları
                        </h3>
                        <div className="space-y-6">
                            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    <span className="font-medium text-green-800">Hesabınız güvenli</span>
                                </div>
                                <p className="text-sm text-green-700 mt-1">Son giriş: 2 saat önce</p>
                            </div>

                            <div className="space-y-3">
                                <button
                                    className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                    <h4 className="font-medium text-gray-800">İki Faktörlü Kimlik Doğrulama</h4>
                                    <p className="text-sm text-gray-600">Ekstra güvenlik katmanı ekleyin</p>
                                </button>

                                <button
                                    className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                    <h4 className="font-medium text-gray-800">Aktif Oturumlar</h4>
                                    <p className="text-sm text-gray-600">Diğer cihazlardaki oturumları görüntüle</p>
                                </button>

                                <button
                                    className="w-full text-left p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                                    <h4 className="font-medium text-red-800">Hesabı Sil</h4>
                                    <p className="text-sm text-red-600">Hesabınızı kalıcı olarak silin</p>
                                </button>
                            </div>
                        </div>
                    </div>
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
                                        className="relative bg-amber-50 w-20 h-20 rounded-full overflow-hidden ring-4 ring-white/30 mb-3">
                                        <Image
                                            src="/images/admin.png"
                                            alt="profile image"
                                            fill
                                            sizes="80px"
                                            priority
                                            className="object-cover"
                                        />
                                    </div>
                                    <h2 className="font-bold font-exo text-xl">{user?.fullName}</h2>
                                    <p className="text-blue-100 text-sm">Premium Account</p>
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
                                    className="w-full flex font-exo items-center gap-3 p-4 rounded-xl mt-4 text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-300 group"
                                >
                                    <LogOut className="text-lg transition-transform group-hover:scale-110"/>
                                    <span className="font-medium">Çıkış Yap</span>
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

export default ProfileClient;