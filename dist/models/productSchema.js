"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, "Product title must be at least characters long"],
        maxlength: [300, "Product title must be at most 300 characters"]
    },
    slug: {
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
exports.Product = (0, mongoose_1.model)('Products', productSchema);
