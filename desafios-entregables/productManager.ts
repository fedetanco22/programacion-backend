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
    id: number;
    products: Product[];

    constructor(products: Product[]) {
        this.id = 0;
        this.products = products;
    }

    getProducts(): Product[] {
        console.log('PRODUCT LIST', this.products);
        return this.products;
    }
    getProductById(id: number): Product {
        const product = this.products.find((p) => p.id === id);
        if (!product) throw new Error('Product not found.');
        console.log('PRODUCT', product);
        return product;
    }

    addProduct(product: Product): void {
        const codeExists = this.products.some((p) => p.code === product.code);
        if (codeExists) throw new Error('Product code already exists, can`t add this product.');
        this.products.push({ ...product, id: this.id++ });
    }
}

const products: Product[] = [];

const productManager = new ProductManager(products);

productManager.getProducts();

productManager.addProduct({
    title: 'Escuadra',
    price: 123.45,
    thumbnail:
        'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
    code: 'E1',
    stock: 10,
});

productManager.addProduct({
    title: 'Calculadora',
    price: 234.56,
    thumbnail:
        'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
    code: 'C1',
    stock: 10,
});
productManager.getProducts();
productManager.getProductById(0);

