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

class ProductManager {
    path: string;
    id: number;

    constructor(path: string) {
        this.path = path;
        this.id = 0;
    }

    async addProduct(product: Product): Promise<void> {
        const newProduct = {
            title: product.title ?? 'No title',
            price: product.price ?? 0,
            thumbnail: product.thumbnail ?? 'No thumbnail',
            code: product.code ?? 'No code',
            stock: product.stock ?? 0,
        };

        const products = await this.getProducts();
        const productExists = products.some((p) => p.code === newProduct.code);
        if (productExists) {
            throw new Error('Product already exists.');
        }

        products.push({ ...newProduct, id: this.id++ });

        try {
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
        } catch (error) {
            console.log('Error al guardar el archivo', error);
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

    // getProductById(id: number): Product {
    //     const product = this.products.find((p) => p.id === id);
    //     if (!product) throw new Error('Product not found.');
    //     console.log('PRODUCT', product);
    //     return product;
    // }

    async getProductById(id: number): Promise<Product> {
        const products = await this.getProducts();
        const product = products.find((p) => p.id === id);
        if (!product) throw new Error('Product not found.');
        console.log('PRODUCT', product);
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

const productManager = new ProductManager('./products.json');

const runProgram = async () => {
    // await productManager
    //     .addProduct({
    //         title: 'Mesa 4',
    //         price: 12.45,
    //         thumbnail:
    //             'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
    //         code: 'M89',
    //         stock: 10,
    //     })
    //     .then(() => {
    //         productManager.getProducts().then((products) => {
    //             console.log('PRODUCTS', products);
    //         });
    //     });

    // await productManager
    //     .addProduct({
    //         title: 'Regla 7',
    //         price: 12.45,
    //         thumbnail:
    //             'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
    //         code: 'R70',
    //         stock: 10,
    //     })
    //     .then(() => {
    //         productManager.getProducts().then((products) => {
    //             console.log('PRODUCTS', products);
    //         });
    //     });

    await productManager.deleteProduct(1);
};

runProgram();

