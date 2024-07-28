const express = require('express');
var router = express.Router();
const articleController = require('../controllers/article');

// router.route('/articles/')
//     .get(articleController.getArticles);

router.route('/articles/:title')
    .get(articleController.searchArticle)
    .post(articleController.createArticle)
    .patch(articleController.updateArticle)
    .delete(articleController.deleteArticle);

router.route('/search/:title')
    .get(articleController.searchArticle);

router.route('/:id')
    .get(articleController.getArticles)
    .patch(articleController.updateArticle)
    .delete(articleController.deleteArticle);


module.exports = router;