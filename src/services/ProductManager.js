"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductManager = void 0;
var fs = require("fs");
var uuid_1 = require("uuid");
var ProductManager = /** @class */ (function () {
    function ProductManager(path) {
        this.path = path;
        this.id = 0;
    }
    ProductManager.prototype.getProductId = function (products) {
        var usersLength = products.length;
        if (usersLength > 0) {
            return parseInt(products[usersLength - 1].Id) + 1;
        }
        return 1;
    };
    ProductManager.prototype.addProduct = function (product) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return __awaiter(this, void 0, void 0, function () {
            var products, newProduct, productExists, error_1;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0: return [4 /*yield*/, this.getProducts()];
                    case 1:
                        products = _j.sent();
                        newProduct = {
                            id: (0, uuid_1.v4)(),
                            title: (_a = product.title) !== null && _a !== void 0 ? _a : 'No title',
                            description: (_b = product.description) !== null && _b !== void 0 ? _b : 'No description',
                            price: (_c = product.price) !== null && _c !== void 0 ? _c : 0,
                            thumbnail: (_d = product.thumbnail) !== null && _d !== void 0 ? _d : 'No thumbnail',
                            code: (_e = product.code) !== null && _e !== void 0 ? _e : 'No code',
                            stock: (_f = product.stock) !== null && _f !== void 0 ? _f : 0,
                            status: (_g = product.status) !== null && _g !== void 0 ? _g : 'No status',
                            category: (_h = product.category) !== null && _h !== void 0 ? _h : 'No category',
                        };
                        productExists = products.some(function (p) { return p.code === newProduct.code; });
                        if (productExists) {
                            throw new Error('Product already exists.');
                        }
                        products.push(newProduct);
                        _j.label = 2;
                    case 2:
                        _j.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'))];
                    case 3:
                        _j.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _j.sent();
                        console.log('Error when saving the file. Make', error_1);
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
    ProductManager.prototype.getProductById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var products, product;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getProducts()];
                    case 1:
                        products = _a.sent();
                        product = products.filter(function (p) { return p.id === id; });
                        if (!product)
                            throw new Error('Product not found.');
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
exports.ProductManager = ProductManager;
