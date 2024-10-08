const express = require('express');
const Product = require('../models/productModel')
const {getProducts, getProduct, createProduct, updateProduct, deleteProduct} = require('../controllers/productController')
const {signup, login, check} = require('../controllers/userController')

const router = express.Router();

router.post('/signup', signup);

router.post('/check', check);

router.post('/login',login)

router.get('/products', getProducts);

router.get('/products/:id', getProduct);

router.post('/products', createProduct);

router.put('/products/:id', updateProduct);

router.delete('/products/:id', deleteProduct);

module.exports = router;