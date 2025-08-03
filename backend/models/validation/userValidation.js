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

export const changePasswordSchema = Joi.object({
    password: Joi.string().required().messages({
        'any.required': 'Mevcut şifre gereklidir.',
        'string.empty': 'Mevcut şifre boş olamaz.'
    }),
    newPassword: Joi.string().min(8).required().messages({
        'any.required': 'Yeni şifre gereklidir.',
        'string.min': 'Yeni şifre en az 8 karakter olmalıdır.',
        'string.empty': 'Yeni şifre boş olamaz.'
    }),
    confirmPassword: Joi.any().valid(Joi.ref('newPassword')).required().messages({ // confirmNewPassword → confirmPassword
        'any.only': 'Şifreler uyuşmuyor.',
        'any.required': 'Şifre tekrarı gereklidir.'
    }),
});

export const updateUserSchema = Joi.object({
    fullName: Joi.string().min(3).max(100).optional(),
    email: Joi.string().email().optional(),
    phoneNumber: Joi.string().min(8).max(15).optional(),
    address: Joi.string().allow('', null).optional(),
    job: Joi.string().max(50).optional(),
    bio: Joi.string().max(500).optional(),
}).or('fullName', 'email', 'phoneNumber', 'address', 'job', 'bio') // en az bir alan zorunlu
    .messages({
        'object.missing': 'En az bir alan güncellenmelidir.',
    });

export const updateUserByAdminSchema = Joi.object({
    fullName: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().min(8).max(15).required(),
    address: Joi.string().allow('').required(),
    job: Joi.string().max(50).allow('').required(),
    bio: Joi.string().max(500).allow('').required(),
    role: Joi.string().valid('CUSTOMER', 'ADMIN').required(),
});