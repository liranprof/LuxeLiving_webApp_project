const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');

// Search

router.route('/search/')
    .get(productController.getProductByName)
    .get(productController.getProductsByType)
    .post(productController.getProductByName)
    .post(productController.getProductsByType);

router.route('/search/:Name')
    .get(productController.getProductByNameParams)
    .post(productController.getProductByNameParams);

router.route('/Type/')
    .get(productController.getProductsByType)
    .post(productController.getProductsByType);

router.route('/search/:id')
    .get(productController.getProduct)
    .post(productController.getProduct);

router.route('/getAll')
    .get(productController.getProducts);

module.exports = router;