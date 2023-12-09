import { Schema, model } from "mongoose";

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, "Product title must be at least characters long"],
        maxlength: [300, "Product title must be at most 300 characters"]
    },
    slug:{
        type: String,
        unique: true,
        lowercase: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, "Product description must be at leats 3 characters long"]
    },
    quantity: {
        type: Number,
        required: true,
        trim: true
    },
    shipping: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

export const Product = model('Products', productSchema);