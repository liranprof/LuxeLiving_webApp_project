const express = require('express');
const router = express.Router();
const ClientController = require('../controllers/client.js');
// Define your routes here
router.route('/')
    .get(ClientController.getClient)
    .get(ClientController.getAllCarts)
    .post(ClientController.createClient);

router.route('/:id')
    .get(ClientController.getCart)
    .patch(ClientController.addCart)
    .patch(ClientController.updateClient)
    .patch(ClientController.changePassword)
    .delete(ClientController.deleteCart)
    .delete(ClientController.deleteClient);

// Export the router
module.exports = router;