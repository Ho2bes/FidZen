# Utiliser l'image Node.js
FROM node:18

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers de package et installer les dépendances
COPY package*.json ./
RUN npm install

# Copier le reste du code
COPY . .

# Construire l'application pour production
RUN npm run build

# Utiliser un serveur léger pour servir les fichiers (par exemple, serve)
RUN npm install -g serve
EXPOSE 3001
CMD ["serve", "-s", "build"]
