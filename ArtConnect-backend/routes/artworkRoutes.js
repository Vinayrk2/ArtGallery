const express = require('express');
const router = express.Router();
const artworkController = require('../controllers/artworkController');
const authController = require('../controllers/authController');

// Public routes
router.get('/', artworkController.getArtworks);
router.get('/recent', artworkController.getRecentArtworks);
router.get('/:id', artworkController.getArtworkById);
router.get('/:id/comments', artworkController.getCommentsForArtwork);
router.get('/:id/feedback', artworkController.getFeedbackForArtwork);

// Protected routes
router.post('/upload', authController.authenticate, artworkController.uploadArtwork);

module.exports = router;
