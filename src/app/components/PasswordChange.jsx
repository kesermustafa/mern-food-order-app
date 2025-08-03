"use client";

import React, {useState} from "react";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import Input from "@/src/app/components/form/Input";
import {useFormik} from "formik";
import {RotateCcwKey} from "lucide-react";
import {fetchWithAuth} from "@/src/app/utils/fetchWithAuth";
import * as Yup from "yup";
import {toast} from "react-toastify";

const PasswordChange = () => {
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    // Eğer isAuthorized’u session veya başka yerden dinamik alıyorsan ona göre ayarla
    const [isAuthorized] = useState(true);

    const formik = useFormik({
        initialValues: {
            password: "",
            newPassword: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            password: Yup.string().required("Mevcut şifre zorunludur"),
            newPassword: Yup.string()
                .min(8, "Yeni şifre en az 8 karakter olmalı")
                .required("Yeni şifre zorunludur"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("newPassword"), null], "Şifreler eşleşmiyor")
                .required("Şifre onayı zorunludur"),
        }),
        onSubmit: async (values, {resetForm}) => {
            setSuccessMessage("");
            setErrorMessage("");

            try {
                // Token'ı fetchWithAuth içinde encryptStorage veya session’dan alıyoruz, burada almayacağız
                const submitData = {
                    password: values.password,
                    newPassword: values.newPassword,
                    confirmPassword: values.confirmPassword,
                };

                const res = await fetchWithAuth(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/users/change-password`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(submitData),
                    }
                );

                toast.success("Şifre başarıyla değiştirildi");
                setSuccessMessage(res.message || "Şifre başarıyla değiştirildi");
                resetForm();
            } catch (error) {
                console.error("Password change error:", error);

                let errorMsg = "Bir hata oluştu";

                if (error instanceof Error && error.message) {
                    if (
                        error.message.includes("yetkiniz yok") ||
                        error.message.includes("unauthorized")
                    ) {
                        errorMsg =
                            "Bu işlemi yapmak için yetkiniz yok. Lütfen yöneticinizle iletişime geçin.";
                    } else if (
                        error.message.includes("Mevcut şifre hatalı") ||
                        error.message.includes("wrong password") ||
                        error.message.includes("incorrect password")
                    ) {
                        errorMsg = "Mevcut şifreniz yanlış. Lütfen tekrar deneyin.";
                    } else if (error.message.includes("same password")) {
                        errorMsg = "Yeni şifre mevcut şifrenizle aynı olamaz.";
                    } else if (error.message.includes("Eski ve yeni şifre gereklidir")) {
                        errorMsg = "Lütfen tüm alanları doldurun.";
                    } else if (error.message.includes("Kullanıcı bulunamadı")) {
                        errorMsg = "Kullanıcı bulunamadı. Lütfen tekrar giriş yapın.";
                    } else {
                        errorMsg = error.message;
                    }
                }

                setErrorMessage(errorMsg);
                toast.error(errorMsg);
            }
        },
    });

    const [showPasswords, setShowPasswords] = useState({
        password: false,
        newPassword: false,
        confirmPassword: false,
    });

    const togglePasswordVisibility = (field) => {
        setShowPasswords((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const inputData = [
        {id: "password", name: "password", placeholder: "Mevcut Şifre"},
        {id: "newPassword", name: "newPassword", placeholder: "Yeni Şifre"},
        {
            id: "confirmPassword",
            name: "confirmPassword",
            placeholder: "Yeni Şifre Onayı",
        },
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-exo font-semibold text-gray-800 flex items-center gap-2">
                <RotateCcwKey className="text-purple-500 w-12 h-12"/>
                Şifre Değiştir
            </h3>

            {!isAuthorized && (
                <div className="mt-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
                    ⚠️ Bu işlemi yapmak için yetkiniz bulunmuyor. Lütfen yöneticinizle iletişime geçin.
                </div>
            )}

            {successMessage && (
                <div
                    className="mt-4 max-w-xl p-3 bg-green-100 border border-green-400 text-center font-semibold  text-green-700 rounded">
                    {successMessage}
                </div>
            )}
            {errorMessage && (
                <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {errorMessage}
                </div>
            )}

            <form onSubmit={formik.handleSubmit}>
                <div className="max-w-xl mt-6 px-2 flex flex-col gap-4">
                    {inputData.map((input) => (
                        <div className="relative" key={input.id}>
                            <Input
                                id={input.id}
                                type={showPasswords[input.name] ? "text" : "password"}
                                name={input.name}
                                placeholder={input.placeholder}
                                value={formik.values[input.name] || ""}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isValid={formik.touched[input.name] && !formik.errors[input.name]}
                            />
                            {formik.touched[input.name] && formik.errors[input.name] && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors[input.name]}</p>
                            )}

                            <div
                                className="absolute text-lg right-10 top-5 transform -translate-y-1/2 cursor-pointer text-gray-500"
                                onClick={() => togglePasswordVisibility(input.name)}
                            >
                                {showPasswords[input.name] ? <FaEyeSlash/> : <FaEye/>}
                            </div>
                        </div>
                    ))}

                    <button
                        type="submit"
                        disabled={formik.isSubmitting || !isAuthorized}
                        className="px-8 mt-4 py-3 text-sm bg-amber-400 hover:bg-amber-500 shadow-[2px_3px_7px_gray] transition-all duration-300 cursor-pointer text-gray-800 font-semibold rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {formik.isSubmitting ? "Şifre Değiştiriliyor..." : "Şifre Değiştir"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PasswordChange;
