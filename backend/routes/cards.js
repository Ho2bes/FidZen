// cards.js
const express = require('express');
const router = express.Router();
const prisma = require('../prisma/prismaclient'); // Utilisation du fichier prismaclient.js

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
  const { cardNumber, storeName, userId } = req.body; // Assurez-vous que userId est inclus dans la requête

  try {
    const newCard = await prisma.loyaltyCard.create({
      data: {
        cardNumber,
        storeName,
        user: {
          connect: { id: userId } // Connecte la carte de fidélité à l'utilisateur existant par son ID
        },
      },
    });
    res.status(201).json(newCard);
  } catch (err) {
    console.error('Erreur lors de l’ajout de la carte de fidélité:', err.message);
    res.status(500).json({ error: 'Erreur lors de l’ajout de la carte de fidélité', details: err.message });
  }
});

// **Route pour récupérer une carte par son ID**
router.get('/:id', async (req, res) => {
  const { id } = req.params; // Récupère l'ID de la carte depuis les paramètres de l'URL

  try {
    const card = await prisma.loyaltyCard.findUnique({
      where: { id: id }, // Utilise l'ID dans la requête Prisma
    });

    if (!card) {
      return res.status(404).json({ error: 'Carte non trouvée' });
    }

    res.json(card);
  } catch (err) {
    console.error('Erreur lors de la récupération de la carte de fidélité:', err.message);
    res.status(500).json({ error: 'Erreur lors de la récupération de la carte de fidélité', details: err.message });
  }
});

module.exports = router;
