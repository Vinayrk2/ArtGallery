const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

// User Signup
router.post('/signup', authController.signup);

// User Login
router.post('/login', authController.login);

// Get User Profile (protected route)
router.get('/profile', authenticateToken, authController.getProfile);

// Update User Profile (protected route)
router.put('/profile', authenticateToken, authController.updateProfile);

// Admin route to get all users (protected and role-based)
router.get('/users', authenticateToken, authorizeRoles('Admin'), authController.getAllUsers);

module.exports = router;