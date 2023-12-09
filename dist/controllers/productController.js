"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.deleteProductBySlug = exports.getProductBySlug = exports.createSingleProduct = exports.getAllProducts = void 0;
const slugify_1 = __importDefault(require("slugify"));
const productSchema_1 = require("../models/productSchema");
const getAllProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let page = Number(req.query.limit) || 1;
        const limit = Number(req.query.limit) || 3;
        const count = yield productSchema_1.Product.countDocuments();
        const totalPages = Math.ceil(count / limit);
        if (page > totalPages) {
            page = totalPages;
        }
        const skip = (page - 1) * limit;
        const products = yield productSchema_1.Product.find().skip(skip).limit(limit);
        res.send({ message: 'get all products', payload: {
                products, totalPages, currentPage: page
            } });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllProducts = getAllProducts;
const createSingleProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, price, description, quantity, sold, shipping } = req.body;
        const productExist = yield productSchema_1.Product.exists({ title: title });
        if (productExist) {
            throw new Error("Product already exist with this title");
        }
        const newProduct = new productSchema_1.Product({
            title: title,
            slug: (0, slugify_1.default)(title),
            price: price,
            description: description,
            quantity: quantity,
            sold: sold,
            shipping: shipping
        });
        newProduct.save();
        res.status(201).send({ message: "product is created" });
    }
    catch (error) {
        next(error);
    }
});
exports.createSingleProduct = createSingleProduct;
const getProductBySlug = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productSchema_1.Product.find({ slug: req.params.slug });
        if (products.length === 0) {
            throw new Error('Product not found with this slug');
        }
        res.send({ message: 'returned a single product', payload: products });
    }
    catch (error) {
        next(error);
    }
});
exports.getProductBySlug = getProductBySlug;
const deleteProductBySlug = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield productSchema_1.Product.findOneAndDelete({ slug: req.params.slug });
        if (!product) {
            throw new Error("Product not found with this slug");
        }
        res.send({ message: "delete a single product", payload: product });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteProductBySlug = deleteProductBySlug;
const updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body.title) {
            req.body.slug = (0, slugify_1.default)(req.body.title);
        }
        const product = yield productSchema_1.Product.findOneAndUpdate({ slug: req.params.slug }, req.body, { new: true });
        if (!product) {
            throw new Error("Product not found with this slug");
        }
        res.send({ message: "This product is updated", payload: product });
    }
    catch (error) {
        next(error);
    }
});
exports.updateProduct = updateProduct;
