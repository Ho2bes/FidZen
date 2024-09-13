// cards.js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Route pour récupérer toutes les cartes de fidélité de l'utilisateur connecté
router.get('/', async (req, res) => {
  try {
    const cards = await prisma.loyaltyCard.findMany();
    res.json(cards);
  } catch (err) {
    console.error('Erreur lors de la récupération des cartes de fidélité:', err.message);
    res.status(500).json({ error: 'Erreur lors de la récupération des cartes de fidélité', details: err.message });
  }
});

// Route pour ajouter une nouvelle carte de fidélité
router.post('/', async (req, res) => {
  const { cardNumber, storeName } = req.body;

  try {
    const newCard = await prisma.loyaltyCard.create({
      data: {
        cardNumber,
        storeName,
      },
    });
    res.status(201).json(newCard);
  } catch (err) {
    console.error('Erreur lors de l’ajout de la carte de fidélité:', err.message);
    res.status(500).json({ error: 'Erreur lors de l’ajout de la carte de fidélité', details: err.message });
  }
});

module.exports = router;
