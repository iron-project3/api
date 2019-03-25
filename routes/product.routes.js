const express = require('express');
const router = express.Router();
const productController = require('../controllers/products.controller');

router.get('/list/:product', productController.getProduct);
// mejor filtrar con query params
router.get('/iterate', productController.iterateProducts);

module.exports = router;