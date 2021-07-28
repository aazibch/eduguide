const express = require('express');
const router = express.Router();

const revisionsController = require('../controllers/revisions');
const authController = require('../controllers/auth');

router.route('/:id').get(revisionsController.getRevision);

// For admins only
router.use(authController.protect);
router.route('/:id/approve').patch(revisionsController.approveRevision);
router.route('/:id/reject').patch(revisionsController.rejectRevision);

module.exports = router;
