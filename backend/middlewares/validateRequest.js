export const validateRequest = (schema) => {
    return (req, res, next) => {
        const {error, value} = schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true,
        });

        if (error) {
            const messages = error.details.map((d) => d.message);
            return res.status(400).json({errors: messages});
        }

        req.body = value; // sanitize edilmiş veriyi set et
        next();
    };
};
