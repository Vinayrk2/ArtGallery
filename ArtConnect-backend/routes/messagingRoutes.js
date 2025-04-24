const express = require('express');
const router = express.Router();
const messagingController = require('../controllers/messagingController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to send a message
router.post('/send', authMiddleware.authenticateToken, messagingController.sendMessage);

// Route to get conversation history by user ID
router.get('/history/:userId', authMiddleware.authenticateToken, messagingController.getConversationHistory);


module.exports = router;