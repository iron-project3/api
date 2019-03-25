const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');


router.post('/', orderController.createOrder);
router.get('/:id', orderController.getOrders);
router.delete('/:id', orderController.delete);

module.exports = router;
