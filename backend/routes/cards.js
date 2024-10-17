const express = require('express');
const router = express.Router();
const prisma = require('../prisma/prismaclient');
const cloudinary = require('../config/cloudinary');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configurer Multer pour utiliser Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'fidzen/cards', // Dossier Cloudinary
    allowedFormats: ['jpg', 'png'],
  },
});

const upload = multer({ storage: storage });

// Route pour ajouter une nouvelle carte de fidélité avec une image
router.post('/', upload.single('image'), async (req, res) => {
  const { cardNumber, storeName, userId } = req.body;
  const imageUrl = req.file ? req.file.path : null;

  try {
    const newCard = await prisma.loyaltyCard.create({
      data: {
        cardNumber,
        storeName,
        imageUrl, // Ajouter l'URL de l'image
        user: {
          connect: { id: userId },
        },
      },
    });
    res.status(201).json(newCard);
  } catch (err) {
    console.error('Erreur lors de l’ajout de la carte de fidélité:', err.message);
    res.status(500).json({ error: 'Erreur lors de l’ajout de la carte de fidélité', details: err.message });
  }
});

module.exports = router;
