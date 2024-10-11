// prismaClient.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Gérer la fermeture des connexions à Prisma proprement
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

module.exports = prisma;
