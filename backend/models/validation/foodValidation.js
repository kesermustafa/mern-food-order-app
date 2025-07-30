import Joi from "joi";

export const foodSchema = Joi.object({
    name: Joi.string().trim().min(1).required().messages({
        "string.empty": "İsim boş olamaz",
        "any.required": "İsim zorunludur",
    }),
    price: Joi.number().positive().required().messages({
        "number.base": "Fiyat sayı olmalıdır",
        "number.positive": "Fiyat pozitif olmalıdır",
        "any.required": "Fiyat zorunludur",
    }),
    description: Joi.string().allow('').trim(),
    image: Joi.string().uri().optional().messages({
        "string.uri": "Geçerli bir görsel URL giriniz",
    }),
});

// PATCH için her alan opsiyonel
export const partialFoodSchema = Joi.object({
    name: Joi.string().trim().min(1),
    price: Joi.number().positive(),
    description: Joi.string().allow('').trim(),
    image: Joi.string().uri().messages({
        "string.uri": "Geçerli bir görsel URL giriniz",
    }),
});