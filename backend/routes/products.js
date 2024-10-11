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

// Route pour récupérer un produit spécifique par ID
router.get('/:id', async (req, res) => {
  const { id } = req.params; // Récupérer l'ID depuis l'URL

  try {
    const product = await prisma.product.findUnique({
      where: { id: id }, // Utiliser l'ID pour chercher le produit
    });

    if (!product) {
      return res.status(404).json({ error: 'Produit non trouvé' });
    }

    res.json(product);
  } catch (err) {
    console.error('Erreur lors de la récupération du produit:', err.message);
    res.status(500).json({ error: 'Erreur lors de la récupération du produit', details: err.message });
  }
});

// Route pour ajouter un nouveau produit
router.post('/', async (req, res) => {
  const { name, code, price, receiptId } = req.body; // Ajoute `receiptId` à la requête

  try {
    // Vérifier si le reçu existe avant d'ajouter le produit
    const receipt = await prisma.receipt.findUnique({
      where: { id: receiptId }
    });

    if (!receipt) {
      return res.status(404).json({ error: 'Reçu non trouvé' });
    }

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

// Route pour mettre à jour un produit
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, code, price } = req.body;

  try {
    const updatedProduct = await prisma.product.update({
      where: { id: id },
      data: { name, code, price },
    });
    res.json(updatedProduct);
  } catch (err) {
    console.error('Erreur lors de la mise à jour du produit:', err.message);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du produit', details: err.message });
  }
});

// Route pour supprimer un produit
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.product.delete({
      where: { id: id },
    });
    res.status(204).send();
  } catch (err) {
    console.error('Erreur lors de la suppression du produit:', err.message);
    res.status(500).json({ error: 'Erreur lors de la suppression du produit', details: err.message });
  }
});

module.exports = router;
