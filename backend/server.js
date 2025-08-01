import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './config/db.js';
import foodRoutes from './routes/foodRoutes.js';
import userRoutes from "./routes/userRoutes.js";

dotenv.config({override: true});

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS ayarları
const allowedOrigins = ['http://localhost:3000'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('CORS hatası: Origin izin verilmiyor'));
        }
    },
    credentials: true, // 🍪 Cookie / Authorization header göndermek için şart
}));

app.use(express.json());

// Routes
app.use('/api/foods', foodRoutes);
app.use("/api/users", userRoutes);

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`🚀 Server ${PORT} portunda çalışıyor`);
        });
    })
    .catch((error) => {
        console.error('Veritabanı bağlantısı başarısız:', error);
    });
