const Order = require('../models/order.model');
const createError = require('http-errors');


// se puede pasar con el body y tu lo especificas

module.exports.createOrder = (req, res, next) => {
  const body = req.body;
  const order = new Order({
    user: req.user.id,
    product: body._id
  });

  order.save()
    .then(newOrder => console.info('ORDER => ', newOrder) || res.status(201).json(newOrder))
    .catch(next);
}

module.exports.getOrders = (req, res, next) => {
  // console.info('USER ID => ', req.params.id)
  Order.find({user: req.params.id})
    .then(orders => res.json(orders))
    .catch(next)
}

module.exports.delete = (req, res, next) => {
  Order.findByIdAndDelete(req.params.id)
    .then(orders => res.json(orders))
    .catch(next)
}

// populate para pintar ordenes en carrito 

