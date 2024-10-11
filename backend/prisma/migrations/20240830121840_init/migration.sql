-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastConnect" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FidelityCard" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "storeName" TEXT NOT NULL,
    "cardNumber" TEXT NOT NULL,
    "dateAdd" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FidelityCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Receipt" (
    "id" TEXT NOT NULL,
    "fidelityCardId" TEXT NOT NULL,
    "userId" TEXT,
    "purchaseDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalCost" DOUBLE PRECISION NOT NULL,
    "purchaseDetails" TEXT NOT NULL,

    CONSTRAINT "Receipt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "receiptId" TEXT,
    "productName" TEXT NOT NULL,
    "codeProduct" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductRecall" (
    "id" TEXT NOT NULL,
    "codeProduct" TEXT NOT NULL,
    "recallDate" TIMESTAMP(3) NOT NULL,
    "recallReason" TEXT NOT NULL,

    CONSTRAINT "ProductRecall_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product_ProductRecall" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "productRecallId" TEXT NOT NULL,

    CONSTRAINT "Product_ProductRecall_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ProductRecall_codeProduct_key" ON "ProductRecall"("codeProduct");

-- AddForeignKey
ALTER TABLE "FidelityCard" ADD CONSTRAINT "FidelityCard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receipt" ADD CONSTRAINT "Receipt_fidelityCard_relation" FOREIGN KEY ("fidelityCardId") REFERENCES "FidelityCard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receipt" ADD CONSTRAINT "Receipt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_receiptId_fkey" FOREIGN KEY ("receiptId") REFERENCES "Receipt"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_ProductRecall" ADD CONSTRAINT "ProductRecall_Product_relation" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product_ProductRecall" ADD CONSTRAINT "ProductRecall_ProductRecall_relation" FOREIGN KEY ("productRecallId") REFERENCES "ProductRecall"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
