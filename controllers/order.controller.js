const Order = require('../models/order.model');
const createError = require('http-errors');


module.exports.getOrders = (req, res, next) =>{
  Order.findById(req.params.id)
    .then(orders => res.json(orders))
    .catch(next)
}

module.exports.delete = (req, res, next) => {
  Order.findByIdAndDelete(req.params.id)
    .then(orders => res.json(orders))
    .catch(next)
}

