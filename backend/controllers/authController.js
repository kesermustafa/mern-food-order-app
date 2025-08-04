import bcrypt from 'bcrypt';
import User from '../models/User.js';
import LoginDTO from '../models/dtos/LoginDTO.js';
import UserDTO from '../models/dtos/UserDTO.js';
import {loginValidation} from '../models/validation/loginValidation.js';
import {generateToken} from '../utils/jwt.js';
import {MESSAGE} from '../utils/ENUM.js';
import {sendEmail} from '../utils/sendEmail.js';
import crypto from 'crypto';
import PasswordResetToken from '../models/PasswordResetToken.js';

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

export const forgotPassword = async (req, res) => {
    const {email} = req.body;

    if (!email)
        return res.status(400).json({message: "Email zorunludur."});

    try {
        const user = await User.findOne({email: email.toLowerCase()});
        if (!user)
            return res.status(404).json({message: "Kullanıcı bulunamadı."});

        // Eski token'ları sil
        await PasswordResetToken.deleteMany({userId: user._id});

        // Yeni token oluştur
        const resetToken = crypto.randomBytes(32).toString('hex');
        const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

        // Token kaydını DB'ye kaydet (15 dk geçerli)
        await PasswordResetToken.create({
            userId: user._id,
            token: hashedToken,
            expiresAt: new Date(Date.now() + 1000 * 60 * 15), // 15 dakika
        });

        // Reset URL
        const resetUrl = `${process.env.CLIENT_URL}/auth/reset-password?token=${resetToken}&id=${user._id}`;

        // HTML mail içeriği
        const message = `
                <div style="max-width: 480px; margin: 0 auto; padding: 30px 20px; background-color: #ffffff; font-family: Arial, sans-serif; border: 1px solid #e0e0e0; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
  
                      <div style="text-align: center;">
                        <h2 style="color: #4f46e5; margin-bottom: 20px;">🔐 Şifre Sıfırlama Talebi</h2>
                      </div>
                    
                      <p style="color: #333333; font-size: 16px; line-height: 1.5; margin-bottom: 12px;">
                        Merhaba <strong>${user.fullName}</strong>,
                      </p>
                    
                      <p style="color: #555555; font-size: 15px; line-height: 1.5; margin-bottom: 24px;">
                        Şifrenizi yenilemek için aşağıdaki butona tıklayın:
                      </p>
                    
                      <div style="text-align: center; margin: 30px 0;">
                        <a href="${resetUrl}" 
                           style="display: inline-block; padding: 12px 28px; background-color: #4f46e5; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: bold;">
                          Şifreyi Sıfırla
                        </a>
                      </div>
                    
                      <p style="color: #888888; font-size: 14px; line-height: 1.4; margin-top: 24px;">
                        Bu bağlantı <strong>15 dakika</strong> boyunca geçerlidir. Eğer bu isteği siz yapmadıysanız bu e-postayı göz ardı edebilirsiniz.
                      </p>
                </div>
        `;

        await sendEmail(user.email, '🔐 Şifre Sıfırlama Linki', message);

        res.status(200).json({message: "Şifre sıfırlama bağlantısı e-posta adresinize gönderildi."});

    } catch (error) {
        console.error("Forgot password hatası:", error);
        res.status(500).json({message: "Sunucu hatası."});
    }
};

export const resetPassword = async (req, res) => {
    const {token, id, newPassword, confirmPassword} = req.body;

    if (!token || !id)
        return res.status(400).json({message: "Geçersiz istek. Eksik parametre."});

    if (!newPassword || !confirmPassword)
        return res.status(400).json({message: "Şifre alanları zorunludur."});

    if (newPassword !== confirmPassword)
        return res.status(400).json({message: "Şifreler eşleşmiyor."});

    try {
        // Hash'lenmiş token ile DB'den eşleştirme
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        const resetTokenDoc = await PasswordResetToken.findOne({
            userId: id,
            token: hashedToken,
            expiresAt: {$gt: Date.now()},
        });

        if (!resetTokenDoc)
            return res.status(400).json({message: "Geçersiz veya süresi dolmuş token."});

        const user = await User.findById(id);
        if (!user)
            return res.status(404).json({message: "Kullanıcı bulunamadı."});

        // Şifreyi güncelle
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        // Token'ı sil
        await PasswordResetToken.deleteOne({_id: resetTokenDoc._id});

        res.status(200).json({message: "Şifre başarıyla güncellendi."});

    } catch (error) {
        console.error("Reset password hatası:", error);
        res.status(500).json({message: "Sunucu hatası."});
    }
};

