const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const usersController = require('../controllers/users');
const revisionsController = require('../controllers/revisions');

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.use(authController.protect);

router.route('/me').get(usersController.getMe);
router.route('/updateme').patch(usersController.updateMe);
router.route('/deleteme').delete(usersController.deleteMe);

// /users/me/revisions
router.route('/me/revisions').get(revisionsController.getRevisionsForUser);
router.route('/updatemypassword').patch(authController.updateMyPassword);

module.exports = router;
