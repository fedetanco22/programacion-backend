"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import express from 'express';
var express = require('express');
var products_1 = require("./routes/products");
var carts_1 = require("./routes/carts");
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/products', products_1.default);
app.use('/api/carts', carts_1.default);
var PORT = process.env.PORT || 8080;
app.listen(PORT, function () {
    console.log("Server listening on port ".concat(PORT));
});
