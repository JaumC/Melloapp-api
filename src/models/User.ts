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
        competition: {
            type: String,
            required: true,
            default: '0',
        },
        tot_score: {
            type: String,
            required: true,
            default: '0',
        },
        search_id: {
            type: String,
            required: true,
        },
        friends: {
            type: [Schema.Types.ObjectId],
            ref: 'User',
            default: []
        }
    });

export default mongoose.model('User', UserSchema);