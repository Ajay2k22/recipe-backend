import mongoose from 'mongoose';
import { APP_URL } from '../config';
const Commmentschema = mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
}, { timestamps: true, toJSON: { getters: true } })

export const Comment = new mongoose.model("comment", Commmentschema)