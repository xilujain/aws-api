export type Product = {
    id: string,
    name: string,
    description: string,
    price: number
};

export type ProductInput = Omit<Product, 'id'>;