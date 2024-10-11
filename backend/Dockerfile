# Utiliser l'image officielle de Node.js
FROM node:16-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances du back-end
RUN npm install

# Copier tout le contenu de l'application
COPY . .

# Exposer le port de l'application (par exemple, 3000)
EXPOSE 3000

# Commande par défaut pour démarrer le serveur back-end
CMD ["npm", "start"]
