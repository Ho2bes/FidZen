const express = require('express');
const multer = require('multer');
const { PrismaClient } = require('@prisma/client');
const { uploadImage } = require('../config/cloudinary'); // Fonction d'upload de Cloudinary

const prisma = new PrismaClient();
const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Stockage temporaire des fichiers avant upload

// Route pour ajouter une carte avec image
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const { cardNumber, storeName, userId } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "Aucune image envoyée" });
    }

    // Envoi de l'image vers Cloudinary
    const imageUrl = await uploadImage(file.path);

    // Création de la carte avec Prisma
    const newCard = await prisma.loyaltyCard.create({
      data: {
        cardNumber,
        storeName,
        imageUrl, // Enregistre l'URL de l'image dans la base de données
        userId,
      },
    });

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
