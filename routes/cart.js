const express = require('express');
var router = express.Router();
const cart = require('../controllers/cart');

// Define your routes here
// router.get('/', (req, res) => {
//     res.send('Welcome to my website!');
// });

router.get('/about', (req, res) => {
    res.send('About page');
});

// Create cart
router.post('/cart/create', cart.createCart);

// Get cart
router.get('/cart/:id', cart.getCart);

// Delete cart
router.delete('/cart/:id/delete', cart.deleteCart);

// Update purchased date
router.put('/cart/:id/update', cart.update_Purchased_date);

// Export the router
module.exports = router;
