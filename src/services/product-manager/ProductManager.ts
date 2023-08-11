import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { AppErrors } from '../../utils/custom-errors';
import * as errors from '../../utils/error-messages';

export interface Product {
    id?: string;
    title: string;
    description: string;
    status: string;
    price: number;
    thumbnail: string[];
    code: string;
    category: string;
    stock: number;
}

export class ProductManager {
    path: string;

    constructor(path: string) {
        this.path = path;
    }

    async addProduct(product: Product): Promise<void> {
        const products = await this.getProducts();

        const newProduct = {
            id: uuidv4(),
            title: product.title ?? 'No title',
            description: product.description ?? 'No description',
            price: product.price ?? 0,
            thumbnail: product.thumbnail ?? ['No thumbnail'],
            code: product.code ?? 'No code',
            stock: product.stock ?? 0,
            status: product.status ?? 'No status',
            category: product.category ?? 'No category',
        };

        const productExists = products.some((p) => p.code === newProduct.code);

        if (productExists) {
            throw new AppErrors('Product already exists.'); // Use the custom error
        }

        products.push(newProduct);

        try {
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
        } catch (error) {
            console.error(errors.ERROR_FILE_SAVE); // Log the error message
            throw new Error(errors.ERROR_FILE_SAVE);
        }
    }

    async getProducts(): Promise<Product[]> {
        try {
            const products = await fs.promises.readFile(this.path, 'utf8');

            return JSON.parse(products);
        } catch (err) {
            return [];
        }
    }

    async getProductById(id: string): Promise<Product[]> {
        const products = await this.getProducts();

        const product = products.filter((p) => p.id === id);

        if (!product || product.length === 0) {
            console.error(errors.ERROR_PRODUCT_NOT_FOUND); // Log the error message
            throw new Error(errors.ERROR_PRODUCT_NOT_FOUND);
        }

        return product;
    }

    async updateProduct(id: string, product: Product): Promise<void> {
        const products = await this.getProducts();
        const index = products.findIndex((p) => p.id === id);

        if (index === -1) {
            console.error(errors.ERROR_PRODUCT_NOT_FOUND); // Log the error message
            throw new Error(errors.ERROR_PRODUCT_NOT_FOUND);
        }

        products[index] = { ...product, id };

        try {
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
        } catch (error) {
            console.error(errors.ERROR_FILE_SAVE); // Log the error message
            throw new Error(errors.ERROR_FILE_SAVE);
        }
    }

    async deleteProduct(id: string): Promise<void> {
        const products = await this.getProducts();
        const index = products.findIndex((p) => p.id === id);

        if (index === -1) throw new Error('Product not found.');
        products.splice(index, 1);

        try {
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
        } catch (error) {
            console.error(errors.ERROR_FILE_SAVE); // Log the error message
            throw new Error(errors.ERROR_FILE_SAVE);
        }
    }
}

