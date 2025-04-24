const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to get notifications for a user
router.get('/:userId', authMiddleware.authenticateToken, notificationController.getNotificationsByUserId);

// Route to mark a notification as read
router.put('/:notificationId/read', authMiddleware.authenticateToken, notificationController.markAsRead);

module.exports = router;