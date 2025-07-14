// src/app/Schema/login.js
import * as Yup from 'yup';

export const loginSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
        .min(8, "Minimum 8 characters")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*.=,?&/+\-])[A-Za-z\d@$#!%*,=.?&/+\-]{8,}$/,
            "Password must contain at least one uppercase, one lowercase, one number and one special character (@$#!%*,=.?&/+\\-)."
        )
        .required("Password is required"),
});
