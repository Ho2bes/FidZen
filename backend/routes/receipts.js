const express = require('express');
const router = express.Router();
const prisma = require('../prisma/prismaclient'); // Importer prisma depuis prismaclient.js

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

// Route pour récupérer un reçu spécifique par ID
router.get('/:id', async (req, res) => {
  const { id } = req.params; // Récupérer l'ID depuis l'URL

  try {
    const receipt = await prisma.receipt.findUnique({
      where: { id: id }, // Utiliser l'ID pour chercher le reçu
    });

    if (!receipt) {
      return res.status(404).json({ error: 'Reçu non trouvé' });
    }

    res.json(receipt);
  } catch (err) {
    console.error('Erreur lors de la récupération du reçu:', err.message);
    res.status(500).json({ error: 'Erreur lors de la récupération du reçu', details: err.message });
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

// Route pour mettre à jour un reçu
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { userId, cardId, purchaseDate, totalAmount } = req.body;

  try {
    const updatedReceipt = await prisma.receipt.update({
      where: { id: id },
      data: {
        userId,
        cardId,
        purchaseDate: new Date(purchaseDate),
        totalAmount,
      },
    });

    if (!updatedReceipt) {
      return res.status(404).json({ error: 'Reçu non trouvé' });
    }

    res.json(updatedReceipt);
  } catch (err) {
    console.error('Erreur lors de la mise à jour du reçu:', err.message);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du reçu', details: err.message });
  }
});

// Route pour supprimer un reçu
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedReceipt = await prisma.receipt.delete({
      where: { id: id },
    });

    res.status(204).send(); // Pas de contenu renvoyé si suppression réussie
  } catch (err) {
    console.error('Erreur lors de la suppression du reçu:', err.message);
    res.status(500).json({ error: 'Erreur lors de la suppression du reçu', details: err.message });
  }
});

module.exports = router;
