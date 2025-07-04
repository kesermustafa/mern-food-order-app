"use client"

import React, {useState} from 'react';
import Input from "@/src/app/components/form/Input";
import Title from "@/src/app/components/Title";
import CustomDateTimePicker from "@/src/app/components/CustomDateTimePicker";

const Reservations = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        personCount: '',
        reservationDate: ''
    });

    const handleDateTimeChange = (dateTime) => {
        setFormData(prev => ({
            ...prev,
            reservationDate: dateTime
        }));
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        console.log('Form Data:', formData);
        // Handle form submission here
    };

    const inputData = [
        {id: 'fullName', name: 'fullName', placeholder: 'Your Full Name', value: formData.fullName},
        {
            id: 'phoneNumber',
            name: 'phoneNumber',
            type: 'text',
            placeholder: 'Your Phone Number',
            value: formData.phoneNumber
        },
        {id: 'email', name: 'email', type: 'email', placeholder: 'Your Email', value: formData.email},
        {
            id: 'personCount',
            name: 'personCount',
            type: 'number',
            placeholder: 'How Many Person?',
            value: formData.personCount
        },
    ];

    return (
        <div className="w-full  py-10">
            <div className="text-center mb-10">
                <Title title={"Book A Table"} desing={"text-3xl text-amber-600 font-semibold"}/>
            </div>

            <div className="container mx-auto mt-10 px-4 lg:px-0 flex flex-col lg:flex-row flex-wrap gap-4">
                <div className="flex-1 relative min-w-[380px] h-auto flex flex-col justify-between gap-8">
                    {inputData.map((input) => (
                        <Input
                            key={input.id}
                            id={input.id}
                            type={input.type}
                            placeholder={input.placeholder}
                            value={input.value}
                            onChange={handleInputChange}
                            name={input.name}
                        />
                    ))}

                    <CustomDateTimePicker
                        placeholder="Select Reservation Date & Time"
                        onDateTimeChange={handleDateTimeChange}
                    />

                    <div className="flex items-center justify-center mb-4">
                        <button
                            type="button"
                            onClick={handleSubmit}
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
        </div>
    );
};

export default Reservations;

