const express = require('express');
var router = express.Router();
const categoryController = require('../services/category');

// router.route('/')
//     .get(categoryController.getCategorys)
//     .post(categoryController.createCategory);

router.route('/:id')
    .get(categoryController.getCategories)
    .patch(categoryController.updateCategory)
    .delete(categoryController.deleteCategory);

module.exports = router;