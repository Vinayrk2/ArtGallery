const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const authController = require('../controllers/authController');

// Public routes
router.get('/', eventController.getEvents);
router.get('/:id', eventController.getEventById);
router.get('/:id/attendees', eventController.getAttendeesForEvent);

// Protected routes
router.post('/create', authController.authenticate, eventController.createEvent);
router.put('/:id/attendees', authController.authenticate, eventController.updateAttendanceStatus);

module.exports = router;
