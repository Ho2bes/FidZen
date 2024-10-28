const express = require('express');
const multer = require('multer');
const { PrismaClient } = require('@prisma/client');
const cloudinary = require('../config/cloudinary'); // Configuration Cloudinary

const prisma = new PrismaClient();
const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Stockage temporaire

// Route pour ajouter une carte avec image
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const { cardNumber, storeName, userId } = req.body; // Champs de la carte
    const file = req.file; // Image envoyée

    if (!file) {
      return res.status(400).json({ message: "Aucune image envoyée" });
    }

    // Envoi de l'image vers Cloudinary
    const result = await cloudinary.uploader.upload(file.path, { folder: 'cards' });
    const imageUrl = result.secure_url; // Récupération de l'URL sécurisée de l'image

    // Création de la carte avec Prisma
    const newCard = await prisma.loyaltyCard.create({
      data: {
        cardNumber,
        storeName,
        imageUrl,
        userId,
      },
    });

    // Réponse de succès
    res.json({ message: 'Carte ajoutée avec succès', newCard });
  } catch (error) {
    console.error('Erreur lors de l’ajout de la carte:', error);
    res.status(500).json({ message: 'Erreur lors de l’ajout de la carte' });
  }
});

// Route pour récupérer toutes les cartes d'un utilisateur
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Récupération des cartes utilisateur
    const cards = await prisma.loyaltyCard.findMany({
      where: { userId },
    });

    res.json(cards);
  } catch (error) {
    console.error('Erreur lors de la récupération des cartes:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des cartes' });
  }
});

module.exports = router;
