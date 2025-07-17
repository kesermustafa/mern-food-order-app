// src/app/Schema/login.js
import * as Yup from 'yup';

export const registerSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    fullName: Yup.string()
        .min(3, "İsim en az 3 karakter olmalı")
        .max(50, "İsim en fazla 50 karakter olabilir")
        .required('Full name is required'),
    password: Yup.string()
        .min(8, "Minimum 8 characters")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*.=,?&/+\-])[A-Za-z\d@$#!%*,=.?&/+\-]{8,}$/,
            "Password must contain at least one uppercase, one lowercase, one number and one special character (@$#!%*,=.?&/+\\-)."
        )
        .required("Password is required"),
    confirmPassword: Yup.string()
        .required("Confirm password is required.")
        .oneOf([Yup.ref("password"), null], "Passwords must match."),
});
