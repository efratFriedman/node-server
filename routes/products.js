const express = require('express');
const { isAuthorized } = require('./middlewares');

const productRouter = express.Router();


let PRODUCTS = [
    { id: "1", name: "Laptop", price: 3500, description: "14 inch ultrabook with 16GB RAM" },
    { id: "2", name: "Headphones", price: 250, description: "Wireless noise-cancelling headphones" },
    { id: "3", name: "Smartphone", price: 2800, description: "Latest model with 128GB storage" },
    { id: "4", name: "Keyboard", price: 120, description: "Mechanical keyboard with backlight" },
    { id: "5", name: "Backpack", price: 180, description: "Waterproof backpack for laptops" }
];

productRouter.get('/', (req, res) => {
    res.status(200).json(PRODUCTS);
});

module.exports = productRouter;