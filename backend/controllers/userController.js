import {HTTP_CODES, MESSAGE} from '../utils/ENUM.js';

import User from "../models/User.js";
import bcrypt from "bcrypt";
import UserDTO from "../models/dtos/UserDTO.js";

export const createUser = async (req, res) => {
    const userDTO = req.userDTO;

    try {
        const existingUser = await User.findOne({email: userDTO.email});
        if (existingUser) {
            return res.status(400).json({message: MESSAGE.CONFLICT_EMAIL});
        }

        // Şifreyi hashle
        const hashedPassword = await bcrypt.hash(userDTO.password, 10);

        // DTO’yu POJO’ya çevir
        const userPOJO = userDTO.toPOJO();

        // Şifreyi hash ile değiştir
        userPOJO.password = hashedPassword;
        userPOJO.role = 'CUSTOMER'

        const newUser = new User(userPOJO);
        const savedUser = await newUser.save();

        const responseDTO = UserDTO.fromPOJOtoDTO(savedUser);

        res.status(201).json({
            message: "Kullanıcı başarıyla oluşturuldu",
            user: responseDTO
        });
    } catch (error) {
        console.error("Kullanıcı oluşturma hatası:", error);
        res.status(500).json({message: MESSAGE.CREATED_ERROR});
    }
};

export const updateUserRole = async (req, res) => {
    const {userId} = req.params;
    const {role} = req.body;

    const allowedRoles = ['CUSTOMER', 'ADMIN'];
    if (!allowedRoles.includes(role)) {
        return res.status(400).json({message: "Geçersiz rol."});
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({message: "Kullanıcı bulunamadı."});
        }

        user.role = role;
        await user.save();

        const responseDTO = UserDTO.fromPOJOtoDTO(user);

        res.status(200).json({
            message: "Kullanıcı rolü güncellendi.",
            user: responseDTO,
        });
    } catch (error) {
        console.error("Rol güncelleme hatası:", error);
        res.status(500).json({message: "Rol güncellenemedi."});
    }
};

export const updateCurrentUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const updates = req.body;

        // İzin verilen alanlar
        const allowedUpdates = ['fullName', 'email', 'phoneNumber', 'address', 'job', 'bio'];
        const filteredUpdates = {};

        allowedUpdates.forEach(field => {
            if (updates[field] !== undefined) filteredUpdates[field] = updates[field];
        });

        // Eğer email güncellenmek isteniyorsa, benzersizliğini kontrol et
        if (filteredUpdates.email) {
            const existingUser = await User.findOne({email: filteredUpdates.email.toLowerCase()});
            if (existingUser && existingUser._id.toString() !== userId) {
                return res.status(400).json({message: "Bu email adresi zaten kullanımda."});
            }
            // İstersen email adresini küçük harfe çevirerek saklayabilirsin
            filteredUpdates.email = filteredUpdates.email.toLowerCase();
        }

        const updatedUser = await User.findByIdAndUpdate(userId, filteredUpdates, {new: true});

        if (!updatedUser) {
            return res.status(404).json({message: "Kullanıcı bulunamadı"});
        }

        const userDTO = UserDTO.fromPOJOtoDTO(updatedUser);

        res.json({message: "Kullanıcı güncellendi", user: userDTO});
    } catch (error) {
        console.error('Kullanıcı güncelleme hatası:', error);
        res.status(500).json({message: "Sunucu hatası"});
    }
};





