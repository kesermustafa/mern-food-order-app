'use client';
import React, {useEffect} from 'react';
import {FaUserEdit} from "react-icons/fa";
import Input from "@/src/app/components/form/Input";
import {useFormik} from "formik";
import {profileSchema} from "@/src/app/Schema/profileSchema";

const AccountInformation = () => {

    // Sahte DB verisi (gerçek projede API'den gelir)
    const fakeUserFromDB = {
        fullName: 'Mustafa Keser',
        phoneNumber: '+90 555 123 45 67',
        email: 'mustafa@example.com',
        address: 'İstanbul, Türkiye',
        birthDate: '1990-05-10'
    };

    const formik = useFormik({
        initialValues: {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            birthDate: ''
        },
        validationSchema: profileSchema,
        onSubmit: async (values, actions) => {
            console.log('Gönderilen veriler:', values);
            // API isteği örneği
            // await axios.post('/api/update-profile', values);
            actions.resetForm();
        }
    });

    useEffect(() => {
        formik.setValues(fakeUserFromDB);
    }, []);

    const inputData = [
        {id: 'fullName', name: 'fullName', placeholder: 'Your Full Name', type: 'text'},
        {id: 'phoneNumber', name: 'phoneNumber', placeholder: 'Your Phone Number', type: 'text'},
        {id: 'email', name: 'email', placeholder: 'Your Email', type: 'email'},
        {id: 'birthDate', name: 'birthDate', placeholder: 'Your Birth Date', type: 'date'},
        {id: 'address', name: 'address', placeholder: 'Your Address', type: 'text'},
    ];

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-3xl font-dancing font-semibold text-amber-600 mb-8 flex items-center gap-2">
                    <FaUserEdit className="text-amber-600"/>
                    Kişisel Bilgiler
                </h3>

                <form onSubmit={formik.handleSubmit}>
                    <div className="mt-10 px-2 flex flex-col lg:flex-row flex-wrap gap-4">
                        <div className="grid grid-cols-1 xl:grid-cols-2 w-full gap-y-8 gap-4">
                            {inputData.map((input) => (
                                <div key={input.id}>
                                    <Input
                                        id={input.id}
                                        type={input.type}
                                        name={input.name}
                                        placeholder={input.placeholder}
                                        value={formik.values[input.name]}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isValid={input.type !== 'date' ? formik.touched[input.name] && !formik.errors[input.name] : ""}
                                    />
                                    {formik.touched[input.name] && formik.errors[input.name] && (
                                        <p className="text-red-500 text-sm mt-1">{formik.errors[input.name]}</p>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="flex w-full flex-col sm:flex-row items-center justify-center gap-4 my-4">
                            <button
                                type="submit"
                                className="px-8 py-3 w-full max-w-80 text-sm bg-amber-500 hover:bg-amber-600 hover:scale-105 shadow-[2px_5px_10px_gray] transition-all duration-300 cursor-pointer text-white font-semibold rounded-2xl"
                            >
                                Update Account
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AccountInformation;
