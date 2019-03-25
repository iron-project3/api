const createError = require('http-errors');
const api_key = process.env.API_KEY;
const api_secret = process.env.API_SECRET;
const sem3 = require("semantics3-node")(api_key,api_secret);
const Product = require('../models/product.model');


module.exports.list = (req, res, next) => {
  const endpoint = "products";
  const method = "GET";
  const jsonStr = {"search": req.query.product || 'iphone'};
 
  sem3.run_query(endpoint, jsonStr, method, function(err, products) {
    if (err) {
        return console.error("Couldn't execute query: get_products");
    }
    
    res.json({
      list: JSON.parse(products).results.map(({ name, description, image, price }) => ({ name, description, image, price }))
    });

    // http://localhost:3002/product?search=apple
    // example on how to get the price res.json(JSON.parse(products).results[0].price);

  });
}

module.exports.create = (req, res, next) => {
  const product = new Product(req.body);

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

// module.exports.iterateProducts = (req, res, next) => {
//   sem3.products.products_field( "search", "iphone" );

//   sem3.products.iterate_products(
//     function(err, products) {
//        if (err) {
//           console.log("Couldn't execute request: iterate_products");
//           return;
//        }
//        res.json(JSON.parse( products ));
//     }
//  );
// }
