// receipts.js
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
  const { purchaseDetails, date } = req.body;

  try {
    const newReceipt = await prisma.receipt.create({
      data: {
        purchaseDetails,
        date,
      },
    });
    res.status(201).json(newReceipt);
  } catch (err) {
    console.error('Erreur lors de l’ajout du reçu:', err.message);
    res.status(500).json({ error: 'Erreur lors de l’ajout du reçu', details: err.message });
  }
});

module.exports = router;
