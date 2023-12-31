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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var fs = require('fs');
var ProductManager = /** @class */ (function () {
    function ProductManager(path) {
        this.path = path;
        this.id = 0;
    }
    ProductManager.prototype.addProduct = function (product) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function () {
            var newProduct, products, productExists, error_1;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        newProduct = {
                            title: (_a = product.title) !== null && _a !== void 0 ? _a : 'No title',
                            price: (_b = product.price) !== null && _b !== void 0 ? _b : 0,
                            thumbnail: (_c = product.thumbnail) !== null && _c !== void 0 ? _c : 'No thumbnail',
                            code: (_d = product.code) !== null && _d !== void 0 ? _d : 'No code',
                            stock: (_e = product.stock) !== null && _e !== void 0 ? _e : 0,
                        };
                        return [4 /*yield*/, this.getProducts()];
                    case 1:
                        products = _f.sent();
                        productExists = products.some(function (p) { return p.code === newProduct.code; });
                        if (productExists) {
                            throw new Error('Product already exists.');
                        }
                        products.push(__assign(__assign({}, newProduct), { id: this.id++ }));
                        _f.label = 2;
                    case 2:
                        _f.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'))];
                    case 3:
                        _f.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _f.sent();
                        console.log('Error al guardar el archivo', error_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ProductManager.prototype.getProducts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var products, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fs.promises.readFile(this.path, 'utf8')];
                    case 1:
                        products = _a.sent();
                        return [2 /*return*/, JSON.parse(products)];
                    case 2:
                        err_1 = _a.sent();
                        return [2 /*return*/, []];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // getProductById(id: number): Product {
    //     const product = this.products.find((p) => p.id === id);
    //     if (!product) throw new Error('Product not found.');
    //     console.log('PRODUCT', product);
    //     return product;
    // }
    ProductManager.prototype.getProductById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var products, product;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getProducts()];
                    case 1:
                        products = _a.sent();
                        product = products.find(function (p) { return p.id === id; });
                        if (!product)
                            throw new Error('Product not found.');
                        console.log('PRODUCT', product);
                        return [2 /*return*/, product];
                }
            });
        });
    };
    ProductManager.prototype.updateProduct = function (id, product) {
        return __awaiter(this, void 0, void 0, function () {
            var products, index, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getProducts()];
                    case 1:
                        products = _a.sent();
                        index = products.findIndex(function (p) { return p.id === id; });
                        if (index === -1)
                            throw new Error('Product not found.');
                        products[index] = __assign(__assign({}, product), { id: id });
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'))];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_2 = _a.sent();
                        console.log('Error al guardar el archivo', error_2);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ProductManager.prototype.deleteProduct = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var products, index, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getProducts()];
                    case 1:
                        products = _a.sent();
                        index = products.findIndex(function (p) { return p.id === id; });
                        if (index === -1)
                            throw new Error('Product not found.');
                        products.splice(index, 1);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'))];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_3 = _a.sent();
                        console.log('Error al guardar el archivo', error_3);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return ProductManager;
}());
var productManager = new ProductManager('./products.json');
var runProgram = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: 
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
            return [4 /*yield*/, productManager.deleteProduct(1)];
            case 1:
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
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
runProgram();
