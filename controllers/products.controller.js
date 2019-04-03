const createError = require('http-errors');
const api_key = process.env.API_KEY;
const api_secret = process.env.API_SECRET;
const sem3 = require("semantics3-node")(api_key,api_secret);
const Product = require('../models/product.model');
const Ebay = require("ebay-node-api");


module.exports.list = (req, res, next) => {
  const search = req.query.search || 'imac';
  console.log('query', req.query)

      let ebay = new Ebay({
          clientID: process.env.API_KEY,
          limit: 20
      });

      ebay.findItemsByKeywords(search).then((data) => {
          res.json(data[0].searchResult[0].item.map(({ title, galleryURL, sellingStatus, primaryCategory, productId}) => ({title, galleryURL, sellingStatus, primaryCategory, productId}))); 
      }, (error) => {
          console.log(error);
      });
     // http://localhost:3002/product?search=apple  

}

module.exports.create = (req, res, next) => {
  const item = req.body;
  // console.log(item.galleryURL);
  const product = new Product({
    name: item.title,
    price: item.sellingStatus[0].currentPrice[0].__value__,
    description: item.description,
    image: item.galleryURL[0],
    category: item.primaryCategory[0].categoryId[0]
  });

  product.save()
    .then(product => res.status(201).json(product))
    .catch(next);
}

module.exports.delete = (req, res, next) => {
  Product.findByIdAndDelete(req.params.id)
    .then(product => {
      if (!product) {
        throw createError(404, 'Column not found')
      } else {
        res.status(204).json()
      }
    }).catch(next);
}


