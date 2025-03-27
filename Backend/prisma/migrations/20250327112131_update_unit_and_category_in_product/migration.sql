-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_categoryIdCt_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_unitIdUt_fkey`;

-- DropIndex
DROP INDEX `Product_categoryIdCt_fkey` ON `product`;

-- DropIndex
DROP INDEX `Product_unitIdUt_fkey` ON `product`;

-- AlterTable
ALTER TABLE `product` MODIFY `categoryIdCt` INTEGER NULL,
    MODIFY `unitIdUt` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_categoryIdCt_fkey` FOREIGN KEY (`categoryIdCt`) REFERENCES `Category`(`idCt`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_unitIdUt_fkey` FOREIGN KEY (`unitIdUt`) REFERENCES `Unit`(`idUt`) ON DELETE SET NULL ON UPDATE CASCADE;
