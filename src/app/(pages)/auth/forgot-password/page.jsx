'use client';

import React, {useState} from 'react';
import Input from "@/src/app/components/form/Input";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {toast} from "react-toastify";
import LoaderSpin from "@/src/app/components/LoaderSpin";

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Geçerli bir email giriniz')
                .required('Email zorunludur'),
        }),
        onSubmit: async (values, actions) => {
            setError(null);
            setSuccessMsg(null);
            setLoading(true);

            try {
                // Burada fetchWithAuth yerine direkt fetch de kullanabilirsin
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/forgot-password`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({email: values.email}),
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Bir hata oluştu');
                }

                setSuccessMsg(data.message || 'Şifre sıfırlama linki email adresinize gönderildi.');
                actions.resetForm();
            } catch (err) {
                setError(err.message);
                toast.error(err.message);
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <div className="max-w-xl mx-auto mt-20 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-3xl font-dancing font-semibold text-amber-600 mb-8 text-center">
                Şifremi Unuttum
            </h2>

            {loading && <LoaderSpin/>}

            {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
            {successMsg && <p className="text-green-600 mb-4 text-center">{successMsg}</p>}

            <form onSubmit={formik.handleSubmit}>
                <div className="mb-6">
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email adresinizi giriniz"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isValid={formik.touched.email && !formik.errors.email}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={loading || !formik.isValid}
                    className="w-full px-8 py-3 text-white bg-amber-500 hover:bg-amber-600 hover:scale-105 shadow-[2px_5px_10px_gray] transition-all duration-300 rounded-2xl font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Gönderiliyor..." : "Şifre Sıfırlama Linki Gönder"}
                </button>
            </form>
        </div>
    );
};

export default ForgotPassword;
