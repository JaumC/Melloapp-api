import { Schema } from 'mongoose';
import mongoose from 'mongoose';

const UserSchema = new Schema({
    profilePic:{
        type: String,
        default: null,
    },
    nickname:{
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    });

export default mongoose.model('User', UserSchema);