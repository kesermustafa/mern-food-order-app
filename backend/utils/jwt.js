import jwt from 'jsonwebtoken';

export const generateToken = (user) => {

    const JWT_SECRET = process.env.JWT_SECRET;
    const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

    const payload = {
        id: user._id,
        email: user.email,
        role: user.role,
    };

    return jwt.sign(payload, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});
};
