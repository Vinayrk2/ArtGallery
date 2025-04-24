const Event = require('../models/Event');
const EventAttendee = require('../models/EventAttendee');
const User = require('../models/User'); // Import the User model

// Create event
exports.createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      image_url,
      location,
      is_virtual,
      virtual_link,
      organizer_id,
      start_datetime,
      end_datetime,
      categories,
    } = req.body;

    const newEvent = await Event.create({
      title,
      description,
      image_url,
      location,
      is_virtual,
      virtual_link,
      organizer_id,
      start_datetime,
      end_datetime,
      categories,
    });

    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all events
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.findAll({
      include: [
        {
          model: User,
          as: 'organizer', // Alias defined in the association
          attributes: ['uuid', 'name'], // Fetch specific fields
        },
      ],
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get event by id
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'organizer', // Alias defined in the association
          attributes: ['name', 'profile_image_url'], // Fetch specific fields
        },
      ],
    });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get attendees for event
exports.getAttendeesForEvent = async (req, res) => {
  try {
    const attendees = await EventAttendee.findAll({
      where: { event_id: req.params.id },
    });
    res.json(attendees);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update attendance status
exports.updateAttendanceStatus = async (req, res) => {
  try {
    const { user_id, status } = req.body;
    const event_id = req.params.id;

    let attendee = await EventAttendee.findOne({
      where: { event_id, user_id },
    });

    if (attendee) {
      attendee.status = status;
      await attendee.save();
    } else {
      attendee = await EventAttendee.create({ event_id, user_id, status });
    }

    res.json(attendee);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
