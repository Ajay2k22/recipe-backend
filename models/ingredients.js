import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    timeRequired: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    instructions: [
        {
            heading: String,
            text: String
        }
    ],
    ingredients: [
        {
            quantity: String,
            unit: String,
            name: String
        }
    ],
})

export const Ingredient = new mongoose.model("ingredients", schema)