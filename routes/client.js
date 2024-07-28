const express = require('express');
var router = express.Router();
const client = require('../controllers/client');


// Create client
router.post('/create-client', client.createClient);

// Get client
router.get('/client/:id', client.getClient);

// Delete client
router.delete('/delete-client/:id', client.deleteClient);

// Update client
router.patch('/update-client/:id', client.updateClient);

// Change password
router.put('/client/:id/resetpwd', client.changePassword);

// Get cart
router.get('/client/:id/carts/:id', client.getCart);

// Add cart
router.post('/client/:id/carts/add', client.addCart);

// Delete cart
router.delete('/client/:id/carts/:id', client.deleteCart);

// Get all carts
router.get('/client/:id/carts', client.getAllCarts);

// Export the router
module.exports = router;

