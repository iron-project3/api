const Order = require('../models/order.model');
const createError = require('http-errors');


// se puede pasar con el body y tu lo especificas

module.exports.createOrder = (req, res, next) => {
  const order = new Order(req.body);

  order.save()
    .then(column => res.status(201).json(column))
    .catch(next);
}
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

