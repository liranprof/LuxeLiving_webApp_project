const express = require('express');
const router = express.Router();
const PasswordController = require('../controllers/password.js');
// Define your routes here
router.route('/')
    .post(PasswordController.createPassword);

router.route('/:id')
    .patch(PasswordController.updatePassword)
    .delete(PasswordController.deletePassword);

// Export the router
module.exports = router;