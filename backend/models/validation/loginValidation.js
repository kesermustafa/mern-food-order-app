import Joi from 'joi';

export const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().messages({
            'string.email': 'Geçerli bir email adresi giriniz.',
            'any.required': 'Email zorunludur.'
        }),
        password: Joi.string().min(6).required().messages({
            'string.min': 'Şifre en az 6 karakter olmalıdır.',
            'any.required': 'Şifre zorunludur.'
        })
    });

    return schema.validate(data, {abortEarly: false});
};
