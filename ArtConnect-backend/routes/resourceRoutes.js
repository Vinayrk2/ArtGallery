const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resourceController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Route to upload a new educational resource
router.post('/', authMiddleware.authenticateToken, resourceController.uploadResource);

// Route to get all educational resources
router.get('/', resourceController.getResources);

// Route to get a specific resource by ID
router.get('/:id', resourceController.getResourceById);

// Route to delete a resource by ID
router.delete('/:id', authMiddleware.authenticateToken, resourceController.deleteResource);

module.exports = router;