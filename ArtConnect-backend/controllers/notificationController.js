const Notification = require('../models/Notification');

// Send notification
exports.sendNotification = async (req, res) => {
    const { userId, content } = req.body;

    try {
        const notification = await Notification.create({ userId, content });
        res.status(201).json({ message: 'Notification sent successfully', notification });
    } catch (error) {
        res.status(500).json({ message: 'Error sending notification', error });
    }
};

// Get notifications by user ID
exports.getNotificationsByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        const notifications = await Notification.findAll({ where: { userId } });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving notifications', error });
    }
};

// Mark notification as read
exports.markAsRead = async (req, res) => {
    const { notificationId } = req.params;

    try {
        const notification = await Notification.findByPk(notificationId);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        notification.read = true;
        await notification.save();
        res.status(200).json({ message: 'Notification marked as read', notification });
    } catch (error) {
        res.status(500).json({ message: 'Error marking notification as read', error });
    }
};