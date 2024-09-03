/*
  Warnings:

  - You are about to drop the column `codeProduct` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `productName` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `codeProduct` on the `ProductRecall` table. All the data in the column will be lost.
  - You are about to drop the column `recallReason` on the `ProductRecall` table. All the data in the column will be lost.
  - You are about to drop the column `fidelityCardId` on the `Receipt` table. All the data in the column will be lost.
  - You are about to drop the column `purchaseDetails` on the `Receipt` table. All the data in the column will be lost.
  - You are about to drop the column `totalCost` on the `Receipt` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Receipt` table. All the data in the column will be lost.
  - You are about to drop the column `creationDate` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastConnect` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `FidelityCard` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product_ProductRecall` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[productId]` on the table `ProductRecall` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Made the column `receiptId` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `description` to the `ProductRecall` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `ProductRecall` table without a default value. This is not possible if the table is not empty.
  - Added the required column `loyaltyCardId` to the `Receipt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalAmount` to the `Receipt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Receipt` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FidelityCard" DROP CONSTRAINT "FidelityCard_userId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_receiptId_fkey";

-- DropForeignKey
ALTER TABLE "Product_ProductRecall" DROP CONSTRAINT "ProductRecall_ProductRecall_relation";

-- DropForeignKey
ALTER TABLE "Product_ProductRecall" DROP CONSTRAINT "ProductRecall_Product_relation";

-- DropForeignKey
ALTER TABLE "Receipt" DROP CONSTRAINT "Receipt_fidelityCard_relation";

-- DropForeignKey
ALTER TABLE "Receipt" DROP CONSTRAINT "Receipt_userId_fkey";

-- DropIndex
DROP INDEX "ProductRecall_codeProduct_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "codeProduct",
DROP COLUMN "productName",
DROP COLUMN "quantity",
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "receiptId" SET NOT NULL;

-- AlterTable
ALTER TABLE "ProductRecall" DROP COLUMN "codeProduct",
DROP COLUMN "recallReason",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "productId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Receipt" DROP COLUMN "fidelityCardId",
DROP COLUMN "purchaseDetails",
DROP COLUMN "totalCost",
DROP COLUMN "userId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "loyaltyCardId" TEXT NOT NULL,
ADD COLUMN     "totalAmount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "purchaseDate" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "creationDate",
DROP COLUMN "lastConnect",
DROP COLUMN "name",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "FidelityCard";

-- DropTable
DROP TABLE "Product_ProductRecall";

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "permissions" TEXT[],

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "productRecallId" TEXT,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoyaltyCard" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "cardNumber" TEXT NOT NULL,
    "storeName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LoyaltyCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserRoles" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserRoles_AB_unique" ON "_UserRoles"("A", "B");

-- CreateIndex
CREATE INDEX "_UserRoles_B_index" ON "_UserRoles"("B");

-- CreateIndex
CREATE UNIQUE INDEX "ProductRecall_productId_key" ON "ProductRecall"("productId");

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_productRecallId_fkey" FOREIGN KEY ("productRecallId") REFERENCES "ProductRecall"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoyaltyCard" ADD CONSTRAINT "LoyaltyCard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receipt" ADD CONSTRAINT "Receipt_loyaltyCardId_fkey" FOREIGN KEY ("loyaltyCardId") REFERENCES "LoyaltyCard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_receiptId_fkey" FOREIGN KEY ("receiptId") REFERENCES "Receipt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductRecall" ADD CONSTRAINT "ProductRecall_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserRoles" ADD CONSTRAINT "_UserRoles_A_fkey" FOREIGN KEY ("A") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserRoles" ADD CONSTRAINT "_UserRoles_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
