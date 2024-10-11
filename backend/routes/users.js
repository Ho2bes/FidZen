const express = require('express');
const bcrypt = require('bcrypt'); // Pour le hashage du mot de passe
const router = express.Router();
const prisma = require('../prisma/prismaclient'); // Importer prisma depuis prismaclient.js

// Créer un utilisateur
router.post('/', async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Tous les champs (email, password, name) sont requis.' });
  }

  try {
    // Vérifier si l'utilisateur existe déjà avec cet email
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });
    if (existingUser) {
      return res.status(400).json({ error: 'Cet email est déjà utilisé.' });
    }

    // Hash du mot de passe avant de l'enregistrer
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword, // Stocker le mot de passe hashé
        name,
      },
    });

    // Ne pas renvoyer le mot de passe hashé dans la réponse
    const { password: _, ...userWithoutPassword } = newUser;

    res.status(201).json(userWithoutPassword);
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
      where: { id: id }, // Utiliser directement l'UUID
    });

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    // Ne pas renvoyer le mot de passe
    const { password: _, ...userWithoutPassword } = user;

    res.json(userWithoutPassword);
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
    // Si un mot de passe est fourni, on le hash avant de l'enregistrer
    let updatedData = { email, name };
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedData.password = hashedPassword;
    }

    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: updatedData,
    });

    // Ne pas renvoyer le mot de passe dans la réponse
    const { password: _, ...userWithoutPassword } = updatedUser;

    res.json(userWithoutPassword);
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
