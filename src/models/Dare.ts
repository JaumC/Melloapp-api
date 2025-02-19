import { Schema } from 'mongoose';
import mongoose from 'mongoose';

const DareSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    date:{
        start:{
            type: Date,
            required: true,
        },
        end:{
            type: Date,
            required: true,
        }
    },
    challenger: {
        type: Boolean,
        required: true,
    },
    weekend: {
        type: Boolean,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    day_squence: {
        type: String,
        required: true,
    },
    month_squence: {
        type: String,
        required: true,
    },
    score: {
        type: String,
        required: true,
    },
});

export default mongoose.model('Dare', DareSchema);