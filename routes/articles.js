const express = require('express');
const router = express.Router();

const articlesController = require('../controllers/articles');
const authController = require('../controllers/auth');
const revisionsController = require('../controllers/revisions');

router.route('/').get(articlesController.getArticles);
router
    .route('/:id')
    .get(articlesController.getArticle)
    .put(authController.protect, articlesController.updateArticle);

// /articles/[articleId]/revisions/[revisionId]
router
    .route('/:articleId/revisions/')
    .get(revisionsController.getRevisionsForArticle);

// For admins only.
router.use(authController.protect);

router.route('/').post(articlesController.createArticle);
router.route('/:id').delete(articlesController.deleteArticle);

module.exports = router;
