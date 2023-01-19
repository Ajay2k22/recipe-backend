import mongoose from 'mongoose';

const Productschema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number, required: true,
    },
    size: {
        type: String, required: true
    },
    image: {
        type: String, required: true
    }
}, { timestamps: true })

export const Product = new mongoose.model("products", Productschema)