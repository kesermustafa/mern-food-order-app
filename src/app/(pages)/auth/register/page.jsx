"use client";

import React, {useState} from "react";
import Link from "next/link";
import Title from "@/src/app/components/Title";
import {useFormik} from "formik";
import Input from "@/src/app/components/form/Input";
import {registerSchema} from "@/src/app/Schema/registerSchema";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";

const RegisterPage = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
    const [serverError, setServerError] = useState("");

    const formik = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: registerSchema,
        onSubmit: async (values, actions) => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/register`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(values),
                });

                const data = await res.json();

                if (!res.ok) {
                    toast.error(data.message || "Bir hata oluştu", {autoClose: 1500});
                    return;
                }

                toast.success("Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...", {autoClose: 1500});
                actions.resetForm();

                setTimeout(() => {
                    router.push("/auth/login?from=register");
                }, 1500); // Toast tamamlanınca yönlendir
            } catch (error) {

                toast.error(error.message || "Kayıt sırasında bir hata oluştu.", {
                    autoClose: 1000,
                });
            }
        },
    });

    const inputData = [
        {id: "fullName", name: "fullName", placeholder: "Full Name", type: "text"},
        {id: "email", name: "email", placeholder: "Your Email", type: "email"},
        {id: "password", name: "password", placeholder: "Your Password", type: "password"},
        {id: "confirmPassword", name: "confirmPassword", placeholder: "Confirm Password", type: "password"},
    ];

    return (
        <div className={"container mx-auto py-20 h-full "}>
            <Title title={"Register"} desing={"text-5xl text-amber-600"}/>

            <form onSubmit={formik.handleSubmit}>
                <div className=" max-w-[600px] mx-auto mt-10 px-2 flex flex-col gap-4">
                    {inputData.map((input) => (
                        <div className="relative" key={input.id}>
                            <Input
                                id={input.id}
                                type={
                                    input.type === "password"
                                        ? showPassword
                                            ? "text"
                                            : "password"
                                        : input.type
                                }
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

                            {(input.name === "password" || input.name === "confirmPassword") && (
                                <div
                                    className="absolute text-lg right-10 top-5 transform -translate-y-1/2 cursor-pointer text-gray-500"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <FaEyeSlash/> : <FaEye/>}
                                </div>
                            )}
                        </div>
                    ))}

                    {serverError && <p className="text-red-500 text-sm mt-2 text-center">{serverError}</p>}

                    <button
                        type="submit"
                        className="px-8 py-3 text-sm bg-amber-400 hover:bg-amber-500  shadow-[2px_3px_7px_gray] transition-all duration-300 cursor-pointer text-gray-800 font-semibold rounded-2xl"
                    >
                        Register
                    </button>
                </div>
            </form>

            <div className={"flex items-center gap-2 justify-center font-exo text-sm mt-4"}>
                <span>If you have an account, please </span>
                <Link href={"/auth/login"} className={"font-semibold text-blue-700"}>
                    Login
                </Link>
            </div>
        </div>
    );
};

export default RegisterPage;
