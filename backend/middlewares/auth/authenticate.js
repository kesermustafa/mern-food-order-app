import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// Kullanıcı doğrulama middleware’i
export const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Token yoksa
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({message: 'Token yok veya geçersiz'});
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        // decoded içinde id, role, email varsa bunları req.user'a ata
        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role
        };

        next();
    } catch (err) {
        console.error('JWT doğrulama hatası:', err.message);
        return res.status(401).json({message: 'Token doğrulama başarısız'});
    }
};


