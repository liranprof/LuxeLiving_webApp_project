const express = require('express');
var router = express.Router();
const supplier = require('../controllers/supplier');

// Create supplier
router.post('/supplier/create', supplier.createSupplier);

// Delete supplier
router.delete('supplier/:id/delete', supplier.deleteSupplier);

// Get supplier
router.get('/supplier/:id', supplier.getSupplier);

// Update supplier
router.put('/supplier/:id/update', supplier.updateSupplier);

// Export the router
module.exports = router;

