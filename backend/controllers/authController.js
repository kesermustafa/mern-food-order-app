import bcrypt from 'bcrypt';
import User from '../models/User.js';
import LoginDTO from '../models/dtos/LoginDTO.js';
import UserDTO from '../models/dtos/UserDTO.js';
import {loginValidation} from '../models/validation/loginValidation.js';
import {generateToken} from '../utils/jwt.js';
import {MESSAGE} from '../utils/ENUM.js';

export const loginUser = async (req, res) => {
    // Joi ile validation
    const {error} = loginValidation(req.body);
    if (error) {
        return res.status(400).json({
            message: "Validation failed",
            details: error.details.map(d => d.message),
        });
    }

    const loginDTO = LoginDTO.fromRequest(req.body);

    try {
        const user = await User.findOne({email: loginDTO.email});
        if (!user) {
            return res.status(404).json({message: MESSAGE.NOT_FOUND_USER});
        }

        const isPasswordValid = await bcrypt.compare(loginDTO.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({message: MESSAGE.INVALID_CREDENTIALS});
        }

        // Token oluşturma
        const token = generateToken(user);

        // DTO dönüşümü
        const responseDTO = UserDTO.fromPOJOtoDTO(user);

        res.status(200).json({
            message: "Giriş başarılı",
            user: {
                userID: responseDTO.id,
                email: responseDTO.email,
                role: responseDTO.role, // 🔑 ROLE BURADA DÖNÜYOR
            },
            token,
        });
    } catch (err) {
        console.error("Giriş hatası:", err);
        res.status(500).json({message: MESSAGE.SERVER_ERROR});
    }
};
