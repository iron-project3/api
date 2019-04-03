const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  product: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  state: {
    type: String
  }
}, {timestamps: true});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;