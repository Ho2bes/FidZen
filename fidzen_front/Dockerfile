# Utiliser l'image officielle de Flutter pour le build
FROM cirrusci/flutter:stable AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers du projet Flutter
COPY . .

# Installer les dépendances Flutter
RUN flutter pub get

# Compiler l'application Flutter en version web
RUN flutter build web

# Utiliser une image légère de serveur web pour servir le contenu statique
FROM nginx:alpine

# Copier le contenu du build web de Flutter dans le répertoire nginx
COPY --from=build /app/build/web /usr/share/nginx/html

# Exposer le port utilisé par nginx (par défaut 80)
EXPOSE 80

# Démarrer nginx
CMD ["nginx", "-g", "daemon off;"]
