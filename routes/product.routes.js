const express = require('express');
const router = express.Router();
const productController = require('../controllers/products.controller');

router.get('/', productController.list);
router.post('/', productController.create);
router.delete('/delete/:id', productController.delete);
router.get('/cart', productController.find);
router.get('/suggestions', productController.suggestions);

// router.get('/iterate', productController.iterateProducts);


module.exports = router;