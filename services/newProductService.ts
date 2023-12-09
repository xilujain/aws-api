import { Product, ProductInput } from "../types";

export const createProduct = (newProduct: ProductInput, products: Product[]) => {
    const id = new Date().getTime().toString();
    const product = { id, ...newProduct };
    products.push(product);
    return products;
}