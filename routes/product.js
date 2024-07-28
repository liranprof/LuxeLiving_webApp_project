const express = require('express');
var router = express.Router();
const product = require('../controllers/product');

// Create product
router.post('/product/create', product.createProduct);

// Delete product
router.delete('product/:id/delete', product.deleteProduct);

// Get product
router.get('/product/:id', product.getProduct);

// Update product
router.put('/product/:id/update', product.updateProduct);

// Export the router
module.exports = router;

