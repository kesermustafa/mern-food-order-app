'use client';

import React, {useEffect, useState} from 'react';
import {FaUserEdit} from "react-icons/fa";
import Input from "@/src/app/components/form/Input";
import {useFormik} from "formik";
import {profileSchema} from "@/src/app/Schema/profileSchema";
import {fetchWithAuth} from "@/src/app/utils/fetchWithAuth";
import {toast} from "react-toastify";
import LoaderSpin from "@/src/app/components/LoaderSpin";
import {encryptStorage} from "@/src/app/utils/encryptStorage";
import {signOut} from "next-auth/react";
import CustomConfirm from "@/src/app/components/CustomConfirm";

const AccountInformation = ({user}) => {
    const [error, setError] = useState(null);

    const formik = useFormik({
        initialValues: {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            job: '',
            bio: '',
        },
        validationSchema: profileSchema,
        onSubmit: async (values, actions) => {
            setError(null);
            try {
                const data = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });

                toast.success(data.message || "Profil başarıyla güncellendi.");
                actions.setTouched({});
            } catch (err) {
                const errMsg = err.message || "Güncelleme sırasında bir hata oluştu.";
                setError(errMsg);
                toast.error(errMsg);
            }
        },
    });

    useEffect(() => {
        if (user) {
            formik.setValues({
                fullName: user.fullName || '',
                phoneNumber: user.phoneNumber || '',
                email: user.email || '',
                address: user.address || '',
                job: user.job || '',
                bio: user.bio || '',
            });
        }
    }, [user]);

    async function handleDeleteAccount() {
        const confirmed = await CustomConfirm({
            title: "Hesabınızı silmek istediğinize emin misiniz?",
            text: "Bu işlem geri alınamaz.",
            icon: "warning",
            cancelButtonText: "İptal",
            confirmButtonText: "Evet, Sil",
        });

        if (!confirmed) return false;

        try {
            const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/api/users/me`, {
                method: "DELETE",
            });

            toast.success(res.message || "Hesabınız başarıyla silindi.");

            if (encryptStorage) {
                encryptStorage.removeItem("token");
            } else if (typeof window !== "undefined") {
                localStorage.removeItem("token");
            }

            await signOut({callbackUrl: "/"});
            return true;
        } catch (error) {
            toast.error("Hesap silinirken bir hata oluştu.");
            return false;
        }
    }

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-3xl font-dancing font-semibold text-amber-600 mb-8 flex items-center gap-2">
                    <FaUserEdit className="text-amber-600"/>
                    Kişisel Bilgiler
                </h3>

                {!user ? (
                    <LoaderSpin/>
                ) : (
                    <>
                        {error && <p className="text-red-600 mb-4">{error}</p>}

                        <form onSubmit={formik.handleSubmit}>
                            <div className="mt-10 px-2 flex flex-col lg:flex-row flex-wrap gap-4">
                                <div className="grid grid-cols-1 xl:grid-cols-2 w-full gap-y-8 gap-4">
                                    {[
                                        {id: 'fullName', name: 'fullName', placeholder: 'Your Full Name', type: 'text'},
                                        {
                                            id: 'phoneNumber',
                                            name: 'phoneNumber',
                                            placeholder: 'Your Phone Number',
                                            type: 'text'
                                        },
                                        {id: 'email', name: 'email', placeholder: 'Your Email', type: 'email'},
                                        {id: 'address', name: 'address', placeholder: 'Your Address', type: 'text'},
                                        {id: 'job', name: 'job', placeholder: 'Your Job', type: 'text'},
                                        {id: 'bio', name: 'bio', placeholder: 'Your Bio', type: 'text'},
                                    ].map((input) => (
                                        <div key={input.id}>
                                            <Input
                                                id={input.id}
                                                type={input.type}
                                                name={input.name}
                                                placeholder={input.placeholder}
                                                value={formik.values[input.name]}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                isValid={formik.touched[input.name] && !formik.errors[input.name]}
                                            />
                                            {formik.touched[input.name] && formik.errors[input.name] && (
                                                <p className="text-red-500 text-sm mt-1">{formik.errors[input.name]}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>


                                <div
                                    className="flex w-full flex-col sm:flex-row items-center justify-center gap-4 my-4">
                                    <button
                                        type="submit"
                                        className="px-8 py-3 w-full max-w-80 text-sm bg-amber-500 hover:bg-amber-600 hover:scale-105 shadow-[2px_5px_10px_gray] transition-all duration-300 cursor-pointer text-white font-semibold rounded-2xl"
                                        disabled={formik.isSubmitting}
                                    >
                                        {formik.isSubmitting ? "Güncelleniyor..." : "Update Account"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </>
                )}

                <p className="text-center text-sm text-gray-600 mt-8">
                    Hesabınızı silmek mi istiyorsunuz?
                    <button
                        type="button"
                        onClick={() => handleDeleteAccount()}
                        className="text-red-600 cursor-pointer hover:underline hover:scale-105 ml-2"
                    >
                        Hesabımı Sil
                    </button>
                </p>


            </div>


        </div>
    );
};

export default AccountInformation;
