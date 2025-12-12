const ProductsController = require('../controllers/product');
const express = require('express');

const router = express.Router();

router.get('/', ProductsController.getProducts);

module.exports = router;