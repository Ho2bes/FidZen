// auth.js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Route pour l'enregistrement d'un utilisateur
router.post('/register', async (req, res) => {
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
    console.error('Erreur lors de l’enregistrement de l’utilisateur:', err.message);
    res.status(500).json({ error: 'Erreur lors de l’enregistrement de l’utilisateur', details: err.message });
  }
});

// Route pour la connexion d'un utilisateur
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    // Simuler la création d'un token de session
    const token = `fake-jwt-token-for-${user.id}`;
    res.json({ message: 'Connexion réussie', token });
  } catch (err) {
    console.error('Erreur lors de la connexion de l’utilisateur:', err.message);
    res.status(500).json({ error: 'Erreur lors de la connexion de l’utilisateur', details: err.message });
  }
});

module.exports = router;
