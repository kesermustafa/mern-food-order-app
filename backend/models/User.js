import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
    },
    address: {
        type: String,
    },
    job: {
        type: String,
    },
    bio: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        enum: ['CUSTOMER', 'ADMIN'],
        default: 'CUSTOMER'
    },

    emailVerified: {
        type: String,
        default: null,
    },
}, {timestamps: true});

export default mongoose.model('User', userSchema);