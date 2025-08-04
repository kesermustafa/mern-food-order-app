'use client';

import React, {useState, useEffect} from 'react';
import Input from "@/src/app/components/form/Input";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {useSearchParams, useRouter} from "next/navigation";
import {toast} from "react-toastify";
import LoaderSpin from "@/src/app/components/LoaderSpin";
import {Eye, EyeOff} from "lucide-react";

const ResetPassword = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get("token");
    const id = searchParams.get("id");

    const toggleNewPassword = () => setShowNewPassword(prev => !prev);
    const toggleConfirmPassword = () => setShowConfirmPassword(prev => !prev);

    useEffect(() => {
        if (!token || !id) {
            setError("Token veya kullanıcı ID eksik.");
        }
    }, [token, id]);

    const formik = useFormik({
        initialValues: {
            newPassword: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object({
            newPassword: Yup.string()
                .min(6, "Şifre en az 6 karakter olmalı")
                .required("Yeni şifre zorunludur"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('newPassword'), null], 'Şifreler eşleşmiyor')
                .required("Şifre tekrar zorunludur")
        }),
        onSubmit: async (values, actions) => {
            setLoading(true);
            setError(null);
            setSuccessMsg(null);

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/reset-password`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        token,
                        id,
                        newPassword: values.newPassword,
                        confirmPassword: values.confirmPassword
                    })
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Şifre sıfırlama başarısız.");
                }

                setSuccessMsg(data.message);
                toast.success(data.message);
                actions.resetForm();

                setTimeout(() => {
                    router.push("/auth/login");
                }, 2000);

            } catch (err) {
                setError(err.message);
                toast.error(err.message);
            } finally {
                setLoading(false);
            }
        }
    });

    return (
        <div className="max-w-xl mx-auto mt-20 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-3xl font-dancing font-semibold text-amber-600 mb-8 text-center">
                Yeni Şifre Belirle
            </h2>

            {loading && <LoaderSpin/>}
            {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
            {successMsg && <p className="text-green-600 mb-4 text-center">{successMsg}</p>}

            {!error && (
                <form onSubmit={formik.handleSubmit}>
                    <div className="relative mb-6">
                        <Input
                            id="newPassword"
                            name="newPassword"
                            type={showNewPassword ? "text" : "password"}
                            placeholder="Yeni şifrenizi giriniz"
                            value={formik.values.newPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isValid={formik.touched.newPassword && !formik.errors.newPassword}
                        />
                        <button
                            type="button"
                            onClick={toggleNewPassword}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                        >
                            {showNewPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                        </button>
                        {formik.touched.newPassword && formik.errors.newPassword && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.newPassword}</p>
                        )}
                    </div>


                    <div className="relative mb-6">
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Yeni şifrenizi tekrar giriniz"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isValid={formik.touched.confirmPassword && !formik.errors.confirmPassword}
                        />
                        <button
                            type="button"
                            onClick={toggleConfirmPassword}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                        >
                            {showConfirmPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                        </button>
                        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</p>
                        )}
                    </div>


                    <button
                        type="submit"
                        disabled={loading || !formik.isValid}
                        className="w-full px-8 py-3 text-white bg-amber-500 hover:bg-amber-600 hover:scale-105 shadow-[2px_5px_10px_gray] transition-all duration-300 rounded-2xl font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Kaydediliyor..." : "Şifreyi Güncelle"}
                    </button>
                </form>
            )}
        </div>
    );
};

export default ResetPassword;
