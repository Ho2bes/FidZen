const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Route pour récupérer tous les reçus
router.get('/', async (req, res) => {
  try {
    const receipts = await prisma.receipt.findMany();
    res.json(receipts);
  } catch (err) {
    console.error('Erreur lors de la récupération des reçus:', err.message);
    res.status(500).json({ error: 'Erreur lors de la récupération des reçus', details: err.message });
  }
});

// Route pour ajouter un nouveau reçu
router.post('/', async (req, res) => {
  const { userId, cardId, purchaseDate, totalAmount } = req.body; // Extraire les champs nécessaires de la requête

  try {
    const newReceipt = await prisma.receipt.create({
      data: {
        userId, // Assurez-vous que ces champs existent dans votre modèle Prisma
        cardId,
        purchaseDate: new Date(purchaseDate), // Assurez-vous de passer une date valide
        totalAmount,
      },
    });
    res.status(201).json(newReceipt);
  } catch (err) {
    console.error('Erreur lors de l’ajout du reçu:', err.message);
    res.status(500).json({ error: 'Erreur lors de l’ajout du reçu', details: err.message });
  }
});

module.exports = router;
