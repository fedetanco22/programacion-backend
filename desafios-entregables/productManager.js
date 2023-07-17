var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var ProductManager = /** @class */ (function () {
    function ProductManager(products) {
        this.id = 0;
        this.products = products;
    }
    ProductManager.prototype.getProducts = function () {
        console.log('PRODUCT LIST', this.products);
        return this.products;
    };
    ProductManager.prototype.getProductById = function (id) {
        var product = this.products.find(function (p) { return p.id === id; });
        if (!product)
            throw new Error('Product not found.');
        console.log('PRODUCT', product);
        return product;
    };
    ProductManager.prototype.addProduct = function (product) {
        var codeExists = this.products.some(function (p) { return p.code === product.code; });
        if (codeExists)
            throw new Error('Product code already exists, can`t add this product.');
        this.products.push(__assign(__assign({}, product), { id: this.id++ }));
    };
    return ProductManager;
}());
var products = [];
var productManager = new ProductManager(products);
productManager.getProducts();
productManager.addProduct({
    title: 'Escuadra',
    price: 123.45,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
    code: 'E1',
    stock: 10,
});
productManager.addProduct({
    title: 'Calculadora',
    price: 234.56,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
    code: 'C1',
    stock: 10,
});
productManager.getProducts();
productManager.getProductById(0);
