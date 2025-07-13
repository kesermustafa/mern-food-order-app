"use client";

import React, {useState} from 'react';
import {useFormik} from 'formik';
import Input from "@/src/app/components/form/Input";
import Title from "@/src/app/components/Title";
import CustomDateTime from "@/src/app/components/CustomDateTime";
import {reservationsSchema} from "@/src/app/Schema/reservations";

const Reservations = () => {

    const [resetDateTime, setResetDateTime] = useState(false);

    const formik = useFormik({
        initialValues: {
            fullName: '',
            phoneNumber: '',
            email: '',
            personCount: '',
            reservationDate: ''
        },
        validationSchema: reservationsSchema,

        onSubmit: async (values, actions) => {
            console.log('Gönderilen veriler:', values);

            // örnek API isteği:
            // await axios.post('/api/reservation', values);

            // toast.success("Rezervasyon alındı!");

            // DateTime bileşenini resetle
            setResetDateTime(true);

            // Tekrardan false'a çek (bir sonraki kullanıma hazır olması için)
            setTimeout(() => setResetDateTime(false), 100);

            actions.resetForm();
        }
    });

    const handleDateTimeChange = (dateTime) => {
        formik.setFieldValue('reservationDate', dateTime);
    };

    const inputData = [
        {id: 'fullName', name: 'fullName', placeholder: 'Your Full Name', type: 'text'},
        {id: 'phoneNumber', name: 'phoneNumber', placeholder: 'Your Phone Number', type: 'text'},
        {id: 'email', name: 'email', placeholder: 'Your Email', type: 'email'},
        {id: 'personCount', name: 'personCount', placeholder: 'How Many Person?', type: 'number'},
    ];

    return (
        <div className="w-full py-10">
            <div className="text-center my-10">
                <Title title={"Book A Table"} desing={"text-5xl font-bold text-amber-600 "}/>
            </div>

            <form onSubmit={formik.handleSubmit}>
                <div className="container mx-auto mt-10 px-2 flex flex-col lg:flex-row flex-wrap gap-4">
                    <div className="flex-1 relative min-w-[360px] h-auto flex flex-col justify-between gap-4">
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
                                    isValid={formik.touched[input.name] && !formik.errors[input.name]}
                                />
                                {formik.touched[input.name] && formik.errors[input.name] && (
                                    <p className="text-red-500 text-sm mt-1">{formik.errors[input.name]}</p>
                                )}
                            </div>
                        ))}

                        <div>
                            <CustomDateTime
                                placeholder="Select Reservation Date & Time"
                                onDateTimeChange={handleDateTimeChange}
                                resetSignal={resetDateTime}
                            />
                            {formik.touched.reservationDate && formik.errors.reservationDate && (
                                <p className="text-red-500 text-sm mt-1">{formik.errors.reservationDate}</p>
                            )}
                        </div>


                        <div className="flex items-center justify-evenly gap-4 mb-4">

                            <button
                                type="button"
                                onClick={() => {
                                    formik.resetForm();
                                    setResetDateTime(true);
                                    setTimeout(() => setResetDateTime(false), 100);
                                }}
                                className="px-8 py-3 text-sm bg-gray-400 hover:bg-gray-500 hover:scale-105 shadow-[2px_5px_10px_gray] transition-all duration-300 cursor-pointer text-white font-semibold rounded-2xl"
                            >
                                Reset Form
                            </button>

                            <button
                                type="submit"
                                className="px-8 py-3 text-sm bg-amber-500 hover:bg-amber-600 hover:scale-105 shadow-[2px_5px_10px_gray] transition-all duration-300 cursor-pointer text-white font-semibold rounded-2xl"
                            >
                                Book Now
                            </button>
                        </div>

                    </div>

                    <div className="flex-1 bg-amber-400 h-full">
                        <iframe
                            src="https://yandex.com.tr/map-widget/v1/?um=constructor%3A750559527738c937c8b779b6a6321dcda19aec3ae910418fa230104a38b0cc34&amp;source=constructor"
                            width="100%"
                            height="450"
                            title="Restaurant Location"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Reservations;
