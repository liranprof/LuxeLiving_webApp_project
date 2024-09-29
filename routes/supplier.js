const express = require('express');
const router = express.Router();
const SupplierController = require('../controllers/supplier.js');
// Define your routes here
router.route('/')
    .get(SupplierController.getAllSuppliers)
    .post(SupplierController.createSupplier);

router.route('/:id')
    .get(SupplierController.getSupplier)
    .patch(SupplierController.updateSupplier)
    .delete(SupplierController.deleteSupplier);

// Export the router
module.exports = router;