const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
  Price: {
    type: Number,
    required: true
  },
  Description: {
    type: String,
  }, 
  Images: {
    type: String
  },
  Product_id: {
    type: Number,
    unique: true,
    required: true
  }
}, {timestamps: true});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;