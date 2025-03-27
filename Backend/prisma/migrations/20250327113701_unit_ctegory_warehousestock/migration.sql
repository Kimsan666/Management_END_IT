/*
  Warnings:

  - You are about to drop the column `categoryIdCt` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `unitIdUt` on the `product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_categoryIdCt_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_unitIdUt_fkey`;

-- DropIndex
DROP INDEX `Product_categoryIdCt_fkey` ON `product`;

-- DropIndex
DROP INDEX `Product_unitIdUt_fkey` ON `product`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `categoryIdCt`,
    DROP COLUMN `unitIdUt`;

-- AlterTable
ALTER TABLE `warehousestock` ADD COLUMN `categoryIdCt` INTEGER NULL,
    ADD COLUMN `unitIdUt` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `WarehouseStock` ADD CONSTRAINT `WarehouseStock_unitIdUt_fkey` FOREIGN KEY (`unitIdUt`) REFERENCES `Unit`(`idUt`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WarehouseStock` ADD CONSTRAINT `WarehouseStock_categoryIdCt_fkey` FOREIGN KEY (`categoryIdCt`) REFERENCES `Category`(`idCt`) ON DELETE SET NULL ON UPDATE CASCADE;
