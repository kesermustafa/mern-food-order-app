import * as Yup from 'yup'

export const reservationsSchema = Yup.object({
    fullName: Yup.string()
        .min(3, "İsim en az 3 karakter olmalı")
        .max(50, "İsim en fazla 50 karakter olabilir")
        .required('Full name is required'),
    phoneNumber: Yup.string()
        .matches(/^\+905\d{9}$/, "Telefon numarası '+905xxxxxxxxx' formatında olmalı")
        .required('Phone number is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    personCount: Yup.number()
        .min(1, 'At least 1 person')
        .required('Person count is required'),
    reservationDate: Yup.string()
        .required('Reservation date is required')

});