const Message = require('../models/Message');

// Send a message
exports.sendMessage = async (req, res) => {
    try {
        const { senderId, receiverId, content } = req.body;
        const newMessage = await Message.create({ senderId, receiverId, content });
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: 'Error sending message', error });
    }
};

// Get conversation history
exports.getConversationHistory = async (req, res) => {
    try {
        const { userId1, userId2 } = req.params;
        const messages = await Message.findAll({
            where: {
                [Op.or]: [
                    { senderId: userId1, receiverId: userId2 },
                    { senderId: userId2, receiverId: userId1 }
                ]
            },
            order: [['createdAt', 'ASC']]
        });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving conversation history', error });
    }
};