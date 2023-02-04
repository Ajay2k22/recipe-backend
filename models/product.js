import mongoose from 'mongoose';
import { APP_URL } from '../config';
const Productschema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String, required: true,
    },
    tag: {
        type: String, required: true
    },
    image: {
        type: String, required: true, get: (image) => {
            return `${APP_URL}/${image}`;
        }
    },
    descriptions: {
        type: String,
        required: true
    },
    
}, { timestamps: true, toJSON: { getters: true } })

export const Product = new mongoose.model("products", Productschema)