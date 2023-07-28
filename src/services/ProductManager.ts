const fs = require('fs');

interface Array<T> {
    find(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): T | undefined;
    some(callback: (value: T, index: number, array: T[]) => unknown, thisArg?: any): boolean;
}

interface Product {
    id?: number;
    title: string;
    price: number;
    thumbnail: string;
    code: string;
    stock: number;
}

export class ProductManager {
    path: string;
    id: number;

    constructor(path: string) {
        this.path = path;
        this.id = 0;
    }

    getProductId(products: string | any[]) {
        const usersLength = products.length;
        if (usersLength > 0) {
            return parseInt(products[usersLength - 1].Id) + 1;
        }

        return 1;
    }

    async addProduct(product: Product): Promise<void> {
        const products = await this.getProducts();

        const newProduct = {
            id: this.getProductId(products),
            title: product.title ?? 'No title',
            price: product.price ?? 0,
            thumbnail: product.thumbnail ?? 'No thumbnail',
            code: product.code ?? 'No code',
            stock: product.stock ?? 0,
        };

        const productExists = products.some((p) => p.code === newProduct.code);
        if (productExists) {
            throw new Error('Product already exists.');
        }

        products.push(newProduct);

        try {
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
        } catch (error) {
            console.log('Error when saving the file. Make', error);
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

    async getProductById(id: number): Promise<Product[]> {
        const products = await this.getProducts();

        const product = products.filter((p) => p.id === id);

        if (!product) throw new Error('Product not found.');

        return product;
    }

    async updateProduct(id: number, product: Product): Promise<void> {
        const products = await this.getProducts();
        const index = products.findIndex((p) => p.id === id);
        if (index === -1) throw new Error('Product not found.');
        products[index] = { ...product, id };
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
        } catch (error) {
            console.log('Error al guardar el archivo', error);
        }
    }

    async deleteProduct(id: number): Promise<void> {
        const products = await this.getProducts();
        const index = products.findIndex((p) => p.id === id);
        if (index === -1) throw new Error('Product not found.');
        products.splice(index, 1);
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
        } catch (error) {
            console.log('Error al guardar el archivo', error);
        }
    }
}

