const express = require('express');
const router = express.Router();
const prisma = require('../prisma/prismaclient'); // Utilisation de prisma pour interagir avec la base de données
const bcrypt = require('bcrypt'); // Utilisation de bcrypt pour hasher les mots de passe

// Route pour l'enregistrement d'un utilisateur
router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;

  try {
    console.log("Tentative d'enregistrement avec :", { email, password, name }); // Log pour vérifier les données reçues

    // Vérifier si l'email existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log("Email déjà utilisé :", email); // Log si l'utilisateur existe déjà
      return res.status(400).json({ error: 'Cet email est déjà enregistré' });
    }

    // Hasher le mot de passe avant de l'enregistrer
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword, // Stockage du mot de passe hashé
        name,
      },
    });

    console.log("Utilisateur créé avec succès :", newUser); // Log après création de l'utilisateur
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
    console.log("Tentative de connexion avec :", { email, password }); // Log pour vérifier les données reçues

    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Vérifier si l'utilisateur existe et si le mot de passe est correct
    if (!user || !(await bcrypt.compare(password, user.password))) {
      console.log("Échec de la connexion pour :", email); // Log si échec de la connexion
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    // Simuler la création d'un token de session (ici tu utiliserais normalement un vrai token JWT)
    const token = `fake-jwt-token-for-${user.id}`;
    console.log("Connexion réussie pour l'utilisateur :", user.email); // Log après succès de la connexion
    res.json({ message: 'Connexion réussie', token });
  } catch (err) {
    console.error('Erreur lors de la connexion de l’utilisateur:', err.message);
    res.status(500).json({ error: 'Erreur lors de la connexion de l’utilisateur', details: err.message });
  }
});

module.exports = router;
