const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const authMiddleware = require('../middleware/authMiddleware');


// Route to get feedback by artwork ID
router.get('/:artworkId', feedbackController.getFeedbackByArtworkId);

module.exports = router;