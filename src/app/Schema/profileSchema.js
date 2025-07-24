import * as Yup from 'yup'

export const profileSchema = Yup.object({
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
    birthDate: Yup.string()
        .required('Birth date is required'),
    address: Yup.string()
        .min(8, "Adress en az 8 karakter olmalı")
        .max(80, "İsim en fazla 80 karakter olabilir")
        .required('Address is required'),

});