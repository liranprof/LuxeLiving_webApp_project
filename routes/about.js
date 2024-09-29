const express = require('express');
const Router = express.Router();
const ProductController = require('../controllers/product.js');
// Define your routes here
//router.get('/', ProductController.getProduct)
Router.route('/about')
    .get(ProductController.getAllProduct)

// Export the router
module.exports = Router;