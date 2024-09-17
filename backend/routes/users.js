const express = require('express');
const router = express.Router();
const prisma = require('../prisma/prismaclient'); // Importer prisma depuis prismaclient.js

// Créer un utilisateur
router.post('/', async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        password,
        name,
      },
    });
    res.status(201).json(newUser);
  } catch (err) {
    console.error('Erreur lors de la création de l’utilisateur:', err);
    res.status(500).json({ error: 'Erreur lors de la création de l’utilisateur', details: err.message });
  }
});

// Récupérer un utilisateur par ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Chercher l'utilisateur par son ID (UUID)
    const user = await prisma.user.findUnique({
      where: { id: id }, // Laisser tel quel car `id` est déjà un UUID
    });

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    res.json(user);
  } catch (err) {
    console.error('Erreur lors de la récupération de l’utilisateur:', err.message);
    res.status(500).json({ error: 'Erreur lors de la récupération de l’utilisateur', details: err.message });
  }
});

// Mettre à jour un utilisateur
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { email, password, name } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: { email, password, name },
    });

    res.json(updatedUser);
  } catch (err) {
    console.error('Erreur lors de la mise à jour de l’utilisateur:', err.message);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l’utilisateur', details: err.message });
  }
});

// Supprimer un utilisateur
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.user.delete({
      where: { id: id },
    });
    res.status(204).send();
  } catch (err) {
    console.error('Erreur lors de la suppression de l’utilisateur:', err.message);
    res.status(500).json({ error: 'Erreur lors de la suppression de l’utilisateur', details: err.message });
  }
});

module.exports = router;
