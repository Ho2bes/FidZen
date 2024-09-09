require('dotenv').config({ path: './.env' }); // Charger dotenv avec le bon chemin

// Vérifiez si la variable est correctement chargée
console.log('DATABASE_URL:', process.env.DATABASE_URL);

const express = require('express');
const app = express(); // Initialiser express
const mongoose = require('mongoose');
const { PrismaClient } = require('@prisma/client');

// Connexion à MongoDB
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/fidzen';
mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// Middleware pour parser le JSON
app.use(express.json());

// Importer Prisma pour PostgreSQL
const prisma = new PrismaClient();

// Utiliser le modèle `User` défini dans Prisma
async function main() {
  try {
    // Créer un nouvel utilisateur
    const utilisateur = await prisma.user.create({
      data: {
        email: 'newuser@example.com',  // Email à tester
        password: 'mysecurepassword',
      },
    });

    console.log(utilisateur);

  } catch (error) {
    if (error.code === 'P2002' && error.meta.target.includes('email')) {
      console.error('Erreur: Cet email est déjà utilisé.');
    } else {
      console.error('Une erreur est survenue:', error);
    }
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// Importer les routes MongoDB
const logRoutes = require('./routes/logs'); // Route pour les logs d'activité
const notificationRoutes = require('./routes/notifications'); // Route pour les notifications

// Utiliser les routes MongoDB
app.use('/api', logRoutes);
app.use('/api', notificationRoutes);

// Route par défaut pour la racine "/"
app.get('/', (req, res) => {
  res.send('Bienvenue sur le serveur FidZen');
});

// Démarrer le serveur
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
