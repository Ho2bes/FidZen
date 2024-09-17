# Utiliser une version de Flutter stable (dernière version disponible)
FROM cirrusci/flutter:stable AS build

# Ajouter un utilisateur non root pour éviter les problèmes de permissions
RUN useradd -ms /bin/bash flutteruser

# Définir le répertoire de travail
WORKDIR /app

# Passer à l'utilisateur non root
USER flutteruser

# Configurer Git pour autoriser le répertoire Flutter
RUN git config --global --add safe.directory /sdks/flutter

# Fixer les permissions pour tout le répertoire Flutter
USER root
RUN sudo chown -R flutteruser:flutteruser /sdks/flutter

# Revenir à l'utilisateur non-root
USER flutteruser

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
