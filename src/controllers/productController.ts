import { NextFunction, Request, Response } from "express";
import slugify from "slugify";

import { Product } from "../models/productSchema";

  export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let page = Number(req.query.limit) || 1;
        const limit = Number(req.query.limit) || 3;
        const count = await Product.countDocuments();
        const totalPages = Math.ceil(count / limit);
        
        if (page > totalPages) {
            page = totalPages;
        }

        const skip = (page-1) * limit;
        const products = await Product.find().skip(skip).limit(limit);

        res.send({ message: 'get all products', payload: {
            products, totalPages, currentPage: page
        } });
    } catch (error) {
        next(error);
    }
}

export const createSingleProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, price, description, quantity, sold, shipping } = req.body;
        const productExist = await Product.exists({ title: title });
        if (productExist) {
            throw new Error("Product already exist with this title");
        }
        const newProduct = new Product({
            title: title,
            slug: slugify(title),
            price: price,
            description: description,
            quantity: quantity,
            sold: sold,
            shipping: shipping
        });

        newProduct.save();

        res.status(201).send({ message: "product is created" });
    } catch (error: any) {
        next(error);
    }
}

export const getProductBySlug = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await Product.find({ slug: req.params.slug });
        if (products.length === 0) {
            throw new Error('Product not found with this slug');
        }

        res.send({ message: 'returned a single product', payload: products })
    } catch (error) {
        next(error);
    }
}

export const deleteProductBySlug = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await Product.findOneAndDelete({ slug: req.params.slug });
        if (!product) {
            throw new Error("Product not found with this slug");
        }

        res.send({ message: "delete a single product", payload: product });
    } catch (error) {
        next(error);
    }
}

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }

        const product = await Product.findOneAndUpdate({ slug: req.params.slug }, req.body, { new: true });
        if (!product) {
            throw new Error("Product not found with this slug");
        }

        res.send({ message: "This product is updated", payload: product });
    } catch (error) {
        next(error);
    }
}