# Étape 1: Utilisation de Flutter pour la compilation
FROM ubuntu:22.04 AS build

# Installer les dépendances nécessaires
RUN apt-get update && \
    apt-get install -y \
    curl \
    unzip \
    xz-utils \
    zip \
    libglu1-mesa \
    ca-certificates \
    git && \
    rm -rf /var/lib/apt/lists/*

# Télécharger et installer Flutter
RUN curl -o flutter.tar.xz "https://storage.googleapis.com/flutter_infra_release/releases/stable/linux/flutter_linux_3.13.0-stable.tar.xz" && \
    tar xf flutter.tar.xz -C /usr/local && \
    rm flutter.tar.xz

# Ajouter Flutter au PATH
ENV PATH="/usr/local/flutter/bin:/usr/local/flutter/bin/cache/dart-sdk/bin:${PATH}"

# Vérifier l'installation de Flutter
RUN flutter doctor

# Créer un utilisateur non root avec UID et GID
RUN useradd -ms /bin/bash -u 1000 -U flutteruser

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de l'application dans le conteneur
COPY . .

# Changer les permissions pour l'utilisateur non root
RUN chown -R flutteruser:flutteruser /app /usr/local/flutter

# Changer d'utilisateur
USER flutteruser

# **Définir le répertoire de travail pour le projet Flutter**
WORKDIR /app/fidzen_front

# Installation des dépendances
RUN flutter pub get

# Supprimer manuellement le dossier build s'il existe
RUN [ -d build ] && rm -rf build || echo "Build directory does not exist, skipping removal."

# Nettoyer le cache Flutter
RUN flutter clean

# Compilation du projet Flutter avec désactivation du tree-shaking des icônes et verbosité maximale
RUN flutter build web --no-tree-shake-icons -vvv || { echo 'Flutter build failed'; tail -n 100 /app/fidzen_front/.dart_tool/flutter_build/*/log.txt; exit 1; }

# Vérification de la présence du dossier build/web
RUN if [ -d build/web ]; then echo "Build/web directory exists"; ls -la build/web; else echo "Build/web directory does not exist"; exit 1; fi

# Étape 2: Utiliser une image Nginx pour servir les fichiers
FROM nginx:alpine

# Copier les fichiers de build dans le répertoire Nginx
COPY --from=build /app/fidzen_front/build/web /usr/share/nginx/html

# Exposer le port utilisé par Nginx (80 par défaut)
EXPOSE 80

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]
