const express = require('express');
const router = express.Router();
const Notification = require('../models/notification.model');

// Créer une nouvelle notification
router.post('/notifications', async (req, res) => {
  try {
    const { userId, message } = req.body;
    const newNotification = new Notification({ userId, message });
    await newNotification.save();
    res.status(201).json(newNotification);
  } catch (error) {
    res.status(500).json({ message: 'Error creating notification', error });
  }
});

// Récupérer toutes les notifications d'un utilisateur
router.get('/notifications/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const notifications = await Notification.find({ userId });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications', error });
  }
});

// Marquer une notification comme lue
router.put('/notifications/:id/read', async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findById(id);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    notification.status = 'read';
    await notification.save();
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ message: 'Error updating notification', error });
  }
});

// Supprimer une notification
router.delete('/notifications/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Notification.findByIdAndDelete(id);
    res.status(200).json({ message: 'Notification deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting notification', error });
  }
});

module.exports = router;
