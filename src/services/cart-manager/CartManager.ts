import * as fs from 'fs';
import { Product } from '../product-manager/ProductManager';
import { v4 as uuidv4 } from 'uuid';
import { AppErrors } from '../../utils/custom-errors';
import * as errors from '../../utils/error-messages';

interface Cart {
    id?: string;
    products: CartProduct[];
}

interface CartProduct {
    id: string;
    quantity: number;
}

export class CartManager {
    path: string;

    constructor(path: string) {
        this.path = path;
    }
    async getCarts(): Promise<Cart[]> {
        try {
            const carts = await fs.promises.readFile(this.path, 'utf8');
            return JSON.parse(carts);
        } catch (error) {
            return [];
        }
    }

    async createCart(): Promise<void> {
        const carts = await this.getCarts();

        const newCart = {
            id: uuidv4(),
            products: [],
        };

        const cartExists = carts.some((c) => c.id === newCart.id);

        if (cartExists) {
            throw new AppErrors('Cart already exists.'); // Use the custom error
        }

        carts.push(newCart);

        try {
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
        } catch (error) {
            console.error(errors.ERROR_FILE_SAVE);
            throw new Error(errors.ERROR_FILE_SAVE);
        }
    }

    async getCartById(id: string): Promise<Cart> {
        const carts = await this.getCarts();
        const cart = carts.find((c) => c.id === id);

        if (!cart) {
            throw new AppErrors('Cart not found.');
        }

        return cart;
    }

    async addProductToCart(pid: string, product: CartProduct, cid: string): Promise<void> {
        const carts = await this.getCarts();

        const cartIndex = carts.findIndex((cart) => cart.id === cid);

        if (cartIndex === -1) {
            throw new AppErrors('Cart not found.');
        }

        const existingProductIndex = carts[cartIndex].products.findIndex((p) => p.id === pid);

        if (existingProductIndex !== -1) {
            carts[cartIndex].products[existingProductIndex].quantity += product.quantity || 1;
        } else {
            carts[cartIndex].products.push({ id: pid, quantity: product.quantity || 1 });
        }

        try {
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
        } catch (error) {
            console.error(errors.ERROR_FILE_SAVE);
            throw new Error(errors.ERROR_FILE_SAVE);
        }
    }
}

