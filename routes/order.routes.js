const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');


router.get('/order/:id', orderController.get);
module.exports = router;
