-- 1. Ajouter la colonne "name" avec une valeur temporairement nullable
ALTER TABLE "User" ADD COLUMN "name" TEXT;

-- 2. Mettre à jour les enregistrements existants avec une valeur par défaut (par exemple "Unknown")
UPDATE "User" SET "name" = 'Unknown' WHERE "name" IS NULL;

-- 3. Modifier la colonne "name" pour la rendre NON NULLABLE
ALTER TABLE "User" ALTER COLUMN "name" SET NOT NULL;
