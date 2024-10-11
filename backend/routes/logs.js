const express = require('express');
const router = express.Router();
const Log = require('../models/log.model');

// Créer un nouveau log d'activité
router.post('/logs', async (req, res) => {
  try {
    const { userId, action } = req.body;
    const newLog = new Log({ userId, action });
    await newLog.save();
    res.status(201).json(newLog);
  } catch (error) {
    res.status(500).json({ message: 'Error creating log', error });
  }
});

// Récupérer tous les logs d'un utilisateur
router.get('/logs/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const logs = await Log.find({ userId });
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching logs', error });
  }
});

// Supprimer un log spécifique
router.delete('/logs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Log.findByIdAndDelete(id);
    res.status(200).json({ message: 'Log deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting log', error });
  }
});

module.exports = router;
