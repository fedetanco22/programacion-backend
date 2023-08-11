"use strict";
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
exports.CartManager = void 0;
var fs = require("fs");
var uuid_1 = require("uuid");
var custom_errors_1 = require("../../utils/custom-errors");
var errors = require("../../utils/error-messages");
var CartManager = /** @class */ (function () {
    function CartManager(path) {
        this.path = path;
    }
    CartManager.prototype.getCarts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var carts, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fs.promises.readFile(this.path, 'utf8')];
                    case 1:
                        carts = _a.sent();
                        return [2 /*return*/, JSON.parse(carts)];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, []];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CartManager.prototype.createCart = function () {
        return __awaiter(this, void 0, void 0, function () {
            var carts, newCart, cartExists, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getCarts()];
                    case 1:
                        carts = _a.sent();
                        newCart = {
                            id: (0, uuid_1.v4)(),
                            products: [],
                        };
                        cartExists = carts.some(function (c) { return c.id === newCart.id; });
                        if (cartExists) {
                            throw new custom_errors_1.AppErrors('Cart already exists.'); // Use the custom error
                        }
                        carts.push(newCart);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'))];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_2 = _a.sent();
                        console.error(errors.ERROR_FILE_SAVE);
                        throw new Error(errors.ERROR_FILE_SAVE);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    CartManager.prototype.getCartById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var carts, cart;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getCarts()];
                    case 1:
                        carts = _a.sent();
                        cart = carts.find(function (c) { return c.id === id; });
                        if (!cart) {
                            throw new custom_errors_1.AppErrors('Cart not found.');
                        }
                        return [2 /*return*/, cart];
                }
            });
        });
    };
    CartManager.prototype.addProductToCart = function (pid, product, cid) {
        return __awaiter(this, void 0, void 0, function () {
            var carts, cartIndex, existingProductIndex, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getCarts()];
                    case 1:
                        carts = _a.sent();
                        if (carts.length === 0) {
                            this.createCart();
                        }
                        cartIndex = carts.findIndex(function (cart) { return cart.id === cid; });
                        if (cartIndex === -1) {
                            throw new custom_errors_1.AppErrors('Cart not found.');
                        }
                        existingProductIndex = carts[cartIndex].products.findIndex(function (p) { return p.id === pid; });
                        if (existingProductIndex !== -1) {
                            carts[cartIndex].products[existingProductIndex].quantity += product.quantity || 1;
                        }
                        else {
                            carts[cartIndex].products.push({ id: pid, quantity: product.quantity || 1 });
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'))];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_3 = _a.sent();
                        console.error(errors.ERROR_FILE_SAVE);
                        throw new Error(errors.ERROR_FILE_SAVE);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return CartManager;
}());
exports.CartManager = CartManager;
