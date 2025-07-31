import Joi from "joi";

export const userSchema = Joi.object({
    fullName: Joi.string().trim().min(3).required().messages({
        "string.empty": "Ad soyad boş olamaz",
        "any.required": "Ad soyad zorunludur",
        "string.min": "Ad soyad en az 3 karakter olmalıdır",
    }),
    email: Joi.string().email().required().messages({
        "string.email": "Geçerli bir e-posta adresi giriniz",
        "string.empty": "E-posta boş olamaz",
        "any.required": "E-posta zorunludur",
    }),
    phoneNumber: Joi.string().allow("").messages({
        "string.base": "Telefon numarası geçersiz",
    }),
    address: Joi.string().allow(""),
    job: Joi.string().allow(""),
    bio: Joi.string().allow(""),
    password: Joi.string().min(6).required().messages({
        "string.min": "Şifre en az 6 karakter olmalıdır",
        "string.empty": "Şifre boş olamaz",
        "any.required": "Şifre zorunludur",
    }),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
        "any.only": "Şifreler eşleşmiyor",
        "string.empty": "Şifre tekrarı boş olamaz",
        "any.required": "Şifre tekrarı zorunludur",
    }),
    emailVerified: Joi.string().allow(null),
});

// PATCH için her alan opsiyonel olacak şekilde
export const partialUserSchema = Joi.object({
    fullName: Joi.string().trim().min(3),
    email: Joi.string().email(),
    phoneNumber: Joi.string().allow(""),
    address: Joi.string().allow(""),
    job: Joi.string().allow(""),
    bio: Joi.string().allow(""),
    password: Joi.string().min(6),
    confirmPassword: Joi.string().valid(Joi.ref("password")),
    emailVerified: Joi.string().allow(null),
});
