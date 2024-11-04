# Utiliser l'image Node.js
FROM node:18

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers de package et installer les dépendances
COPY package*.json ./
RUN npm install

# Copier le reste du code
COPY . .

# Exposer le port de l'application
EXPOSE 3000

# Commande de démarrage du backend
CMD ["npm", "start"]
