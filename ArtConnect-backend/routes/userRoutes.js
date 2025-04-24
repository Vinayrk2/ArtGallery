const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

// Public routes
router.get('/:id', userController.getUserProfile);
router.get('/:id/collections', userController.getUserCollections);

// Protected routes
router.put('/:id', authController.authenticate, userController.updateUserProfile);

module.exports = router;
