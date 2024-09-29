const express = require('express');
const Router = express.Router();
const ProductController = require('../controllers/product.js');
// Define your routes here
//router.get('/', ProductController.getProduct)
Router.route('/')
    .get(ProductController.getAllProduct)
    .post(ProductController.createProduct);

Router.route('/:id')
    .get(ProductController.getProduct)
    .patch(ProductController.updateProduct)
    .delete(ProductController.deleteProduct);

// Export the router
module.exports = Router;