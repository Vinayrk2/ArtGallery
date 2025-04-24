const Feedback = require('../models/Feedback');

// Create feedback for an artwork
exports.createFeedback = async (req, res) => {
    try {
        const { artworkId, content } = req.body;
        const feedback = await Feedback.create({ artworkId, content });
        res.status(201).json({ message: 'Feedback created successfully', feedback });
    } catch (error) {
        res.status(500).json({ message: 'Error creating feedback', error });
    }
};

// Get feedback by artwork ID
exports.getFeedbackByArtworkId = async (req, res) => {
    try {
        const { artworkId } = req.params;
        const feedback = await Feedback.findAll({ where: { artworkId } });
        res.status(200).json(feedback);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving feedback', error });
    }
};