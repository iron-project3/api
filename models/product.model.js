const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  image: {
    type: String
  },
  category: {
    type: String,
  }
}, {timestamps: true});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;