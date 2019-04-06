const Order = require('../models/order.model');
const createError = require('http-errors');

module.exports.createOrder = (req, res, next) => {
  Order.findOneAndUpdate(
    { user: req.user.id, state: 'cart' },
    { $addToSet: { product: [req.body._id] }}, 
    { new: true })
    .then(order => {
      if (order) {
        res.status(201).json(order)
      } else {
        return new Order({
          user: req.user.id,
          product: req.body._id
        })
        .save()
        .then(order => {
          res.status(201).json(order)
        })
      }
    })
    .catch(next)
}

module.exports.getOrders = (req, res, next) => {
  // console.info('USER ID => ', req.params.id)
  Order.find({ user: req.user.id })
    .populate('product')
    .then(orders => res.json(orders))
    .catch(next)
}

module.exports.getCart = (req, res, next) => {
  // console.info('USER ID => ', req.params.id)
  Order.findOne({ user: req.params.id, state: 'cart' })
    .populate('product')
    .then(order => res.json(order))
    .catch(next)
}

//5ca87284bef68c3a4349f84a

module.exports.deleteProduct = (req, res, next) => {
  Order.findOneAndUpdate(
    { user: req.user.id, state: 'cart' },
    {  $pullAll: { product: ["5ca87b4076a0d63fba2399bf"] }}, 
    { new: true })
    .then(order => {
      res.status(201).json(order)
    })
    .catch(next)
}

// populate para pintar ordenes en carrito 

