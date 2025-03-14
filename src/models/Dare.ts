import { Schema } from 'mongoose';
import mongoose from 'mongoose';

const DareSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    start_date:{
        type: Date,
        required: true,
    },
    end_date:{
        type: Date,
        required: true,
    },
    days:{
        type: String,
        require: true,
    },
    friends: {
        type: String,
        required: true,
    },
    weekend: {
        type: Boolean,
        required: true,
    },
    day_squence: {
        type: String,
        required: true,
    },
    mounth_squence: {
        type: String,
        required: true,
    },
    streak: {
        type: String,
        required: true,
    },
});

export default mongoose.model('Dare', DareSchema);