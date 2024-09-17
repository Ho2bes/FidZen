require('dotenv').config({ path: './.env' }); // Charger dotenv avec le bon chemin

console.log('DATABASE_URL:', process.env.DATABASE_URL);

const express = require('express');
const app = express(); // Initialiser express
const mongoose = require('mongoose');
const prisma = require('./prisma/prismaClient'); // Importer le fichier prismaClient.js pour gérer Prisma

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

// Route par défaut pour la racine "/"
app.get('/', (req, res) => {
  res.send('Bienvenue sur le serveur FidZen');
});

// Routes Prisma pour gérer les utilisateurs
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes); // Utiliser les routes définies dans users.js

// Importer et utiliser les routes des autres API
const authRoutes = require('./routes/auth');
const cardRoutes = require('./routes/cards');
const receiptRoutes = require('./routes/receipts');
const productRoutes = require('./routes/products');
const logRoutes = require('./routes/logs');
const notificationRoutes = require('./routes/notifications');

app.use('/api/auth', authRoutes); // Routes pour l'authentification et la gestion des utilisateurs
app.use('/api/cards', cardRoutes); // Routes pour la gestion des cartes de fidélité
app.use('/api/receipts', receiptRoutes); // Routes pour la gestion des reçus
app.use('/api/products', productRoutes); // Routes pour la gestion des produits
app.use('/api/logs', logRoutes); // Routes MongoDB pour les logs
app.use('/api/notifications', notificationRoutes); // Routes MongoDB pour les notifications

// Fonction de test pour vérifier si l'utilisateur est récupéré correctement
async function testUserRetrieval() {
  const testUserId = "votre_id_utilisateur"; // Remplacez par l'ID que vous avez reçu
  try {
    const user = await prisma.user.findUnique({
      where: { id: testUserId },
    });

    if (!user) {
      console.log('Utilisateur non trouvé.');
    } else {
      console.log('Utilisateur trouvé:', user);
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de l’utilisateur:', error.message);
  }
}

// Appeler la fonction de test
// Vous pouvez commenter ceci après l'avoir testé
testUserRetrieval();

// Démarrer le serveur
const server = app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// Gestion des arrêts du serveur et de Prisma
process.on('SIGTERM', () => {
  server.close(async () => {
    console.log('Process terminated, shutting down server...');
    await prisma.$disconnect();
    mongoose.connection.close();
  });
});

module.exports = app; // Exporter l'application pour les tests
