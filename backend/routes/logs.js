const express = require('express');
const router = express.Router();
const prisma = require('../prisma/prismaclient'); // Utilisation de Prisma

// Créer un nouveau log d'activité
router.post('/', async (req, res) => {
  try {
    const { userId, action } = req.body;
    console.log('Tentative de création d’un log:', { userId, action });

    // Vérification des données reçues
    if (!userId || !action) {
      return res.status(400).json({ message: 'Les champs userId et action sont obligatoires.' });
    }

    // Création d'un log avec Prisma
    const newLog = await prisma.log.create({
      data: {
        userId,
        action,
      },
    });

    console.log('Log créé avec succès:', newLog);
    res.status(201).json(newLog);
  } catch (error) {
    console.error('Erreur lors de la création du log:', error);
    res.status(500).json({ message: 'Erreur lors de la création du log', error });
  }
});

// Récupérer tous les logs d'un utilisateur
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    console.log('Récupération des logs pour l’utilisateur:', userId);

    // Vérification de l'userId
    if (!userId) {
      return res.status(400).json({ message: 'L\'userId est requis pour récupérer les logs.' });
    }

    // Récupération des logs avec Prisma
    const logs = await prisma.log.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }, // Trier par date de création descendante
    });

    if (logs.length === 0) {
      return res.status(404).json({ message: 'Aucun log trouvé pour cet utilisateur.' });
    }

    console.log('Logs récupérés avec succès:', logs);
    res.status(200).json(logs);
  } catch (error) {
    console.error('Erreur lors de la récupération des logs:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des logs', error });
  }
});

// Supprimer un log spécifique
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Tentative de suppression du log:', id);

    // Suppression du log avec Prisma
    const deletedLog = await prisma.log.delete({
      where: { id },
    });

    console.log('Log supprimé avec succès:', deletedLog);
    res.status(200).json({ message: 'Log supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du log:', error);
    res.status(500).json({ message: 'Erreur lors de la suppression du log', error });
  }
});

module.exports = router;
