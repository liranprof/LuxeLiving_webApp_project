const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cart.js');
// Define your routes here
router.route('/')
.get(CartController.getAllProduct)
.post(CartController.createCart);

router.route('/:id')
    .get(CartController.getProduct)
    .get(CartController.getCart)
    .patch(CartController.update_Purchased_date)
    .patch(CartController.addProduct)
    .delete(CartController.deleteCart)
    .delete(CartController.deleteProduct);
    
// Export the router
module.exports = router;
