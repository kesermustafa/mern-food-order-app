// src/app/Schema/login.js
import * as Yup from 'yup';

export const passwordChangeSchema = Yup.object({

    password: Yup.string()
        .min(8, "Minimum 8 characters")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*.=,?&/+\-])[A-Za-z\d@$#!%*,=.?&/+\-]{8,}$/,
            "Password must contain at least one uppercase, one lowercase, one number and one special character (@$#!%*,=.?&/+\\-)."
        )
        .required("Password is required"),
    newPassword: Yup.string()
        .min(8, "Minimum 8 characters")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*.=,?&/+\-])[A-Za-z\d@$#!%*,=.?&/+\-]{8,}$/,
            "Password must contain at least one uppercase, one lowercase, one number and one special character (@$#!%*,=.?&/+\\-)."
        )
        .required("Password is required"),

    confirmNewPassword: Yup.string()
        .required("Confirm password is required.")
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match."),
});
