import { Schema } from 'mongoose';
import mongoose from 'mongoose';

const DareSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    host:{
        type: String,
        required: true,
    },
    start_date:{
        type: String,
        required: true,
    },
    end_date:{
        type: String,
        required: true,
    },
    days:{
        type: String,
        require: true,
    },
    challengers: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
        default: []
    },
    weekend: {
        type: Boolean,
        required: true,
    },
    day_sequency: {
        type: String,
        required: true,
    },
    mounth_sequency: {
        type: String,
        required: true,
    },
    streak: {
        type: String,
        required: true,
    },
});

export default mongoose.model('Dare', DareSchema);