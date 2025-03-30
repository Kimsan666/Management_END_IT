/*
  Warnings:

  - Added the required column `warehouseStockId` to the `CartItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `warehouseStockId` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `cartitem` DROP FOREIGN KEY `CartItem_productId_fkey`;

-- DropForeignKey
ALTER TABLE `orderitem` DROP FOREIGN KEY `OrderItem_productId_fkey`;

-- DropIndex
DROP INDEX `CartItem_productId_fkey` ON `cartitem`;

-- DropIndex
DROP INDEX `OrderItem_productId_fkey` ON `orderitem`;

-- AlterTable
ALTER TABLE `cartitem` ADD COLUMN `warehouseStockId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `orderitem` ADD COLUMN `warehouseStockId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_warehouseStockId_fkey` FOREIGN KEY (`warehouseStockId`) REFERENCES `WarehouseStock`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_warehouseStockId_fkey` FOREIGN KEY (`warehouseStockId`) REFERENCES `WarehouseStock`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
