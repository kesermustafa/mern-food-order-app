import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    image: String,
}, {timestamps: true});

export default mongoose.model('Food', foodSchema);
