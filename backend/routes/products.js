// products.js
const express = require('express');
const router = express.Router();
const prisma = require('../prisma/prismaclient'); // Importer prisma depuis prismaclient.js

// Route pour récupérer tous les produits achetés
router.get('/', async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (err) {
    console.error('Erreur lors de la récupération des produits:', err.message);
    res.status(500).json({ error: 'Erreur lors de la récupération des produits', details: err.message });
  }
});

// Route pour ajouter un nouveau produit
router.post('/', async (req, res) => {
  const { name, code, price, receiptId } = req.body; // Ajoute `receiptId` à la requête

  try {
    const newProduct = await prisma.product.create({
      data: {
        name,
        code,
        price,
        receipt: {
          connect: { id: receiptId }, // Connexion au reçu existant via son ID
        },
      },
    });
    res.status(201).json(newProduct);
  } catch (err) {
    console.error('Erreur lors de l’ajout du produit:', err.message);
    res.status(500).json({ error: 'Erreur lors de l’ajout du produit', details: err.message });
  }
});

module.exports = router;
