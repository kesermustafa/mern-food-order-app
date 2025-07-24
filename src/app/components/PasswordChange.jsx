"use client";

import React, {useState} from 'react';
import {FaEye, FaEyeSlash, FaKey} from "react-icons/fa";
import Input from "@/src/app/components/form/Input";
import {useFormik} from "formik";
import {passwordChangeSchema} from "@/src/app/Schema/passwordChangeSchema";
import {RotateCcwKey} from "lucide-react";

const PasswordChange = () => {
    const [showPasswords, setShowPasswords] = useState({
        password: false,
        newPassword: false,
        confirmNewPassword: false,
    });

    const togglePasswordVisibility = (field) => {
        setShowPasswords((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const formik = useFormik({
        initialValues: {
            password: '',
            newPassword: '',
            confirmNewPassword: '',
        },
        validationSchema: passwordChangeSchema,
        onSubmit: async (values, actions) => {
            console.log('Gönderilen veriler:', values);
            actions.resetForm();
        },
    });

    const inputData = [
        {id: 'password', name: 'password', placeholder: 'Your Password'},
        {id: 'newPassword', name: 'newPassword', placeholder: 'Your New Password'},
        {id: 'confirmNewPassword', name: 'confirmNewPassword', placeholder: 'Confirm New Password'},
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-exo font-semibold text-gray-800 flex items-center gap-2">
                <RotateCcwKey className="text-purple-500 w-12 h-12"/>
                Change Password
            </h3>

            <form onSubmit={formik.handleSubmit}>
                <div className="max-w-[600px] mt-6 px-2 flex flex-col gap-4">
                    {inputData.map((input) => (
                        <div className="relative" key={input.id}>
                            <Input
                                id={input.id}
                                type={showPasswords[input.name] ? "text" : "password"}
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
                        className="px-8 mt-4 py-3 text-sm bg-amber-400 hover:bg-amber-500 shadow-[2px_3px_7px_gray] transition-all duration-300 cursor-pointer text-gray-800 font-semibold rounded-2xl"
                    >
                        Password Change
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PasswordChange;
