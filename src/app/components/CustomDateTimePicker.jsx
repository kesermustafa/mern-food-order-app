"use client"

import React, {useState, useRef, useEffect} from 'react';
import {Calendar, Clock, ChevronLeft, ChevronRight, X} from 'lucide-react';

const CustomDateTimePicker = ({placeholder = "Select Date & Time", onDateTimeChange}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [activeTab, setActiveTab] = useState('date');
    const pickerRef = useRef(null);

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days = [];

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }

        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(new Date(year, month, day));
        }

        return days;
    };

    const isDateDisabled = (date) => {
        if (!date) return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
    };

    const handleDateClick = (date) => {
        if (isDateDisabled(date)) return;
        setSelectedDate(date);
        setActiveTab('time');
    };

    const handleTimeChange = (time) => {
        setSelectedTime(time);
        if (selectedDate && time) {
            const dateTime = new Date(selectedDate);
            const [hours, minutes] = time.split(':');
            dateTime.setHours(parseInt(hours), parseInt(minutes));
            onDateTimeChange?.(dateTime);
        }
    };

    const handleConfirm = () => {
        if (selectedDate && selectedTime) {
            const dateTime = new Date(selectedDate);
            const [hours, minutes] = selectedTime.split(':');
            dateTime.setHours(parseInt(hours), parseInt(minutes));
            onDateTimeChange?.(dateTime);
            setIsOpen(false);
        }
    };

    const navigateMonth = (direction) => {
        const newMonth = new Date(currentMonth);
        newMonth.setMonth(currentMonth.getMonth() + direction);
        setCurrentMonth(newMonth);
    };

    const formatDisplayDate = () => {
        if (!selectedDate) return placeholder;
        const date = selectedDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        return selectedTime ? `${date} ${selectedTime}` : date;
    };

    const generateTimeSlots = () => {
        const slots = [];
        const now = new Date();
        const isToday = selectedDate && selectedDate.toDateString() === now.toDateString();

        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

                // Disable past times if today is selected
                if (isToday) {
                    const timeDate = new Date(selectedDate);
                    timeDate.setHours(hour, minute);
                    if (timeDate <= now) continue;
                }

                slots.push(time);
            }
        }
        return slots;
    };

    return (
        <div className=" " ref={pickerRef}>
            <div
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white cursor-pointer hover:border-amber-500 transition-colors duration-200 flex items-center justify-between"
                onClick={() => setIsOpen(!isOpen)}
            >
        <span className={`${selectedDate ? 'text-gray-800' : 'text-gray-400'}`}>
          {formatDisplayDate()}
        </span>
                <Calendar className="w-5 h-5 text-amber-500"/>
            </div>

            {isOpen && (
                <div
                    className="absolute top-0 left-0 right-0 mx-auto mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white p-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold">Select Date & Time</h3>
                            <X
                                className="w-5 h-5 cursor-pointer hover:bg-amber-600 rounded"
                                onClick={() => setIsOpen(false)}
                            />
                        </div>
                        <div className="flex mt-2 bg-amber-400 rounded-lg p-1">
                            <button
                                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                                    activeTab === 'date'
                                        ? 'bg-white text-amber-600 shadow-sm'
                                        : 'text-white hover:bg-amber-300'
                                }`}
                                onClick={() => setActiveTab('date')}
                            >
                                <Calendar className="w-4 h-4 inline mr-2"/>
                                Date
                            </button>
                            <button
                                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                                    activeTab === 'time'
                                        ? 'bg-white text-amber-600 shadow-sm'
                                        : 'text-white hover:bg-amber-300'
                                }`}
                                onClick={() => setActiveTab('time')}
                                disabled={!selectedDate}
                            >
                                <Clock className="w-4 h-4 inline mr-2"/>
                                Time
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                        {activeTab === 'date' && (
                            <div>
                                {/* Month Navigation */}
                                <div className="flex justify-between items-center mb-4">
                                    <button
                                        onClick={() => navigateMonth(-1)}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <ChevronLeft className="w-5 h-5 text-gray-600"/>
                                    </button>
                                    <h4 className="text-lg font-semibold text-gray-800">
                                        {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                                    </h4>
                                    <button
                                        onClick={() => navigateMonth(1)}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <ChevronRight className="w-5 h-5 text-gray-600"/>
                                    </button>
                                </div>

                                {/* Days of Week */}
                                <div className="grid grid-cols-7 gap-1 mb-2">
                                    {days.map(day => (
                                        <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                                            {day}
                                        </div>
                                    ))}
                                </div>

                                {/* Calendar Grid */}
                                <div className="grid grid-cols-7 gap-1">
                                    {getDaysInMonth(currentMonth).map((date, index) => (
                                        <button
                                            key={index}
                                            onClick={() => date && handleDateClick(date)}
                                            disabled={!date || isDateDisabled(date)}
                                            className={`
                        h-10 w-10 text-sm rounded-lg transition-all duration-200 
                        ${!date ? 'invisible' : ''}
                        ${isDateDisabled(date)
                                                ? 'text-gray-300 cursor-not-allowed'
                                                : 'hover:bg-amber-50 hover:text-amber-600 cursor-pointer'
                                            }
                        ${selectedDate && date && selectedDate.toDateString() === date.toDateString()
                                                ? 'bg-amber-500 text-white shadow-lg'
                                                : 'text-gray-700'
                                            }
                      `}
                                        >
                                            {date?.getDate()}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'time' && (
                            <div>
                                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                                    Select Time for {selectedDate?.toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                                </h4>
                                <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto">
                                    {generateTimeSlots().map((time) => (
                                        <button
                                            key={time}
                                            onClick={() => handleTimeChange(time)}
                                            className={`
                        py-2 px-3 text-sm rounded-lg transition-all duration-200 border
                        ${selectedTime === time
                                                ? 'bg-amber-500 text-white border-amber-500 shadow-md'
                                                : 'text-gray-700 border-gray-200 hover:bg-amber-50 hover:border-amber-300'
                                            }
                      `}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-200 p-4 bg-gray-50">
                        <div className="flex justify-between items-center">
                            <button
                                onClick={() => {
                                    setSelectedDate(null);
                                    setSelectedTime('');
                                    setActiveTab('date');
                                }}
                                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                            >
                                Clear
                            </button>
                            <button
                                onClick={handleConfirm}
                                disabled={!selectedDate || !selectedTime}
                                className={`
                  px-6 py-2 text-sm font-medium rounded-lg transition-all duration-200
                  ${selectedDate && selectedTime
                                    ? 'bg-amber-500 text-white hover:bg-amber-600 shadow-md'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                }
                `}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomDateTimePicker;