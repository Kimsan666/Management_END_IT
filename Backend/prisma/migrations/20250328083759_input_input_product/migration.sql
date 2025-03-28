-- CreateTable
CREATE TABLE `InputProduct` (
    `idInp` INTEGER NOT NULL AUTO_INCREMENT,
    `quantityPo` INTEGER NOT NULL,
    `Quantity_Inp` INTEGER NOT NULL,
    `Warning` VARCHAR(191) NULL,
    `createdDT` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedDT` DATETIME(3) NOT NULL,
    `productId` INTEGER NULL,

    PRIMARY KEY (`idInp`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `InputProduct` ADD CONSTRAINT `InputProduct_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
