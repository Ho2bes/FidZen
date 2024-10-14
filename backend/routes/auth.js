const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const prisma = require('../prisma/prismaclient'); // Utiliser Prisma pour la gestion des utilisateurs

// Route pour l'enregistrement
router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Cet email est déjà utilisé.' });
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    res.status(201).json({ message: 'Utilisateur créé avec succès', user: newUser });
  } catch (err) {
    console.error('Erreur lors de la création de l’utilisateur:', err.message);
    res.status(500).json({ error: 'Erreur lors de la création de l’utilisateur' });
  }
});

// Route pour la connexion
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    // Simuler la génération d'un token de session (ici tu utiliserais un vrai JWT)
    const token = `fake-jwt-token-for-${user.id}`;
    res.json({ message: 'Connexion réussie', token });
  } catch (err) {
    console.error('Erreur lors de la connexion:', err.message);
    res.status(500).json({ error: 'Erreur lors de la connexion' });
  }
});

module.exports = router;
