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

export const getCurrentUser = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({message: "Kullanıcı bulunamadı"});
        }

        const userDTO = UserDTO.fromPOJOtoDTO(user);

        res.status(200).json({
            message: "Kullanıcı bilgileri getirildi",
            user: userDTO
        });
    } catch (error) {
        console.error("Kullanıcı bilgisi getirme hatası:", error);
        res.status(500).json({message: "Sunucu hatası"});
    }
};

export const updateUserByAdmin = async (req, res) => {
    try {
        const {userId} = req.params;
        const updates = req.body;

        const allowedUpdates = ['fullName', 'email', 'phoneNumber', 'address', 'job', 'bio', 'role'];

        const missingFields = allowedUpdates.filter(field => !(field in updates));
        if (missingFields.length > 0) {
            return res.status(400).json({message: `Eksik alanlar: ${missingFields.join(', ')}`});
        }

        // Email benzersizliği kontrolü
        if (updates.email) {
            const existingUser = await User.findOne({email: updates.email.toLowerCase()});
            if (existingUser && existingUser._id.toString() !== userId) {
                return res.status(400).json({message: "Bu email adresi zaten kullanımda."});
            }
            updates.email = updates.email.toLowerCase();
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updates, {new: true, runValidators: true});

        if (!updatedUser) {
            return res.status(404).json({message: "Kullanıcı bulunamadı."});
        }

        const userDTO = UserDTO.fromPOJOtoDTO(updatedUser);

        res.status(200).json({
            message: "Kullanıcı başarıyla güncellendi.",
            user: userDTO,
        });
    } catch (error) {
        console.error("Admin kullanıcı güncelleme hatası:", error);
        res.status(500).json({message: "Sunucu hatası."});
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

export const getUserById = async (req, res) => {
    try {
        const {userId} = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({message: "Kullanıcı bulunamadı."});
        }

        const userDTO = UserDTO.fromPOJOtoDTO(user);

        res.status(200).json({
            message: "Kullanıcı getirildi.",
            user: userDTO
        });
    } catch (error) {
        console.error("Kullanıcı getirme hatası:", error);
        res.status(500).json({message: "Sunucu hatası."});
    }
};

/*export const changePassword = async (req, res) => {
    const userId = req.user.id;
    const {currentPassword: password, newPassword} = req.body;

    if (!password || !newPassword) {
        return res.status(400).json({message: "Eski ve yeni şifre gereklidir."});
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({message: "Kullanıcı bulunamadı"});
        }

        // Mevcut şifre doğru mu kontrol et
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: "Mevcut şifre hatalı"});
        }

        // Yeni şifreyi hashle
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;

        await user.save();

        res.status(200).json({message: "Şifre başarıyla güncellendi"});
    } catch (error) {
        console.error("Şifre güncelleme hatası:", error);
        res.status(500).json({message: "Sunucu hatası"});
    }
};*/

export const changePassword = async (req, res) => {
    const userId = req.user.id;
    const {password, newPassword, confirmPassword} = req.body; // confirmPassword ekleyin

    if (!password || !newPassword || !confirmPassword) {
        return res.status(400).json({message: "Tüm alanlar zorunludur."});
    }

    // Validation middleware zaten kontrol ediyor ama ekstra güvenlik için:
    if (newPassword !== confirmPassword) {
        return res.status(400).json({message: "Yeni şifreler eşleşmiyor."});
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({message: "Kullanıcı bulunamadı"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: "Mevcut şifre hatalı"});
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;

        await user.save();

        res.status(200).json({message: "Şifre başarıyla güncellendi"});
    } catch (error) {
        console.error("Şifre güncelleme hatası:", error);
        res.status(500).json({message: "Sunucu hatası"});
    }
};

export const deleteUserById = async (req, res) => {
    try {
        const {userId} = req.params;

        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({message: "Kullanıcı bulunamadı."});
        }

        const userDTO = UserDTO.fromPOJOtoDTO(user);

        res.status(200).json({
            message: "Kullanıcı silindi.",
            user: userDTO
        });
    } catch (error) {
        console.error("Kullanıcı silme hatası:", error);
        res.status(500).json({message: "Sunucu hatası."});
    }
};

export const getUsersPaginated = async (req, res) => {
    try {

        const page = parseInt(req.query.page) > 0 ? parseInt(req.query.page) : 1;
        const limit = parseInt(req.query.limit) > 0 ? parseInt(req.query.limit) : 10;
        const skip = (page - 1) * limit;

        const search = req.query.search ? req.query.search.trim() : '';

        const filter = {};
        if (search) {
            filter.$or = [
                {fullName: {$regex: search, $options: 'i'}},
                {email: {$regex: search, $options: 'i'}},
            ];
        }

        const totalUsers = await User.countDocuments(filter);

        // Sayfalı kullanıcıları getir
        const users = await User.find(filter)
            .skip(skip)
            .limit(limit)
            .sort({fullName: 1});

        const usersDTO = users.map(user => UserDTO.fromPOJOtoDTO(user));

        res.status(200).json({
            message: "Kullanıcılar getirildi",
            page,
            limit,
            totalPages: Math.ceil(totalUsers / limit),
            totalUsers,
            users: usersDTO,
        });
    } catch (error) {
        console.error("Kullanıcı listeleme hatası:", error);
        res.status(500).json({message: "Sunucu hatası"});
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().sort({fullName: 1});

        const usersDTO = users.map(user => UserDTO.fromPOJOtoDTO(user));

        res.status(200).json({
            message: "Tüm kullanıcılar getirildi",
            totalUsers: users.length,
            users: usersDTO,
        });
    } catch (error) {
        console.error("Tüm kullanıcıları getirme hatası:", error);
        res.status(500).json({message: "Sunucu hatası"});
    }
};






