const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Créer un nouvel utilisateur
  const utilisateur = await prisma.utilisateur.create({
    data: {
      email: 'test@example.com',
      nom: 'Doe',
      prenom: 'John',
    },
  });

  console.log(utilisateur);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
