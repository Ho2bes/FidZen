// auth.js
const express = require('express');
const router = express.Router();
const prisma = require('../prisma/prismaclient'); // Utilisation de prismaclient.js

// Route pour l'enregistrement d'un utilisateur
router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;

  try {
    // Vérifier si l'email existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Cet email est déjà enregistré' });
    }

    const newUser = await prisma.user.create({
      data: {
        email,
        password, // Tu devrais idéalement hacher le mot de passe avant de l'enregistrer
        name,
      },
    });

    res.status(201).json({ message: 'Utilisateur enregistré avec succès', user: newUser });
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

    // Vérifier si l'utilisateur existe et si le mot de passe est correct
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    // Simuler la création d'un token de session (ici tu utiliserais normalement un vrai token JWT)
    const token = `fake-jwt-token-for-${user.id}`;
    res.json({ message: 'Connexion réussie', token });
  } catch (err) {
    console.error('Erreur lors de la connexion de l’utilisateur:', err.message);
    res.status(500).json({ error: 'Erreur lors de la connexion de l’utilisateur', details: err.message });
  }
});

module.exports = router;
