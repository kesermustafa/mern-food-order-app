import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './config/db.js';
import foodRoutes from './routes/foodRoutes.js';

dotenv.config({override: true});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/foods', foodRoutes);

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`🚀 Server ${PORT} portunda çalışıyor`);
        });
    })
    .catch((error) => {
        console.error('Veritabanı bağlantısı başarısız:', error);
    });
