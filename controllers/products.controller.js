const createError = require('http-errors');
const api_key = process.env.API_KEY;
const api_secret = process.env.API_SECRET;
const sem3 = require("semantics3-node")(api_key,api_secret);


module.exports.getProduct = (req, res, next) => {
  const endpoint = "products";
  const method = "GET";
  const jsonStr = {"search": req.params.product};
 
  sem3.run_query(endpoint, jsonStr, method, function(err, products) {
    if (err) {
        return console.error("Couldn't execute query: get_products");
    }
    
    res.json(JSON.parse(products));

    // example on how to get the price res.json(JSON.parse(products).results[0].price);

  });
}

module.exports.iterateProducts = (req, res, next) => {
  sem3.products.products_field( "search", "iphone" );

  sem3.products.iterate_products(
    function(err, products) {
       if (err) {
          console.log("Couldn't execute request: iterate_products");
          return;
       }
       res.json(JSON.parse( products ));
    }
 );
}
