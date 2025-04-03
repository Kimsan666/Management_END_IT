-- DropForeignKey
ALTER TABLE `image` DROP FOREIGN KEY `Image_employeeId_fkey`;

-- DropForeignKey
ALTER TABLE `image` DROP FOREIGN KEY `Image_productId_fkey`;

-- DropForeignKey
ALTER TABLE `inputproduct` DROP FOREIGN KEY `InputProduct_productId_fkey`;

-- DropForeignKey
ALTER TABLE `inputproduct` DROP FOREIGN KEY `InputProduct_warehouseId_fkey`;

-- DropForeignKey
ALTER TABLE `warehousestock` DROP FOREIGN KEY `WarehouseStock_productId_fkey`;

-- DropForeignKey
ALTER TABLE `warehousestock` DROP FOREIGN KEY `WarehouseStock_warehouseId_fkey`;

-- DropIndex
DROP INDEX `Image_employeeId_fkey` ON `image`;

-- DropIndex
DROP INDEX `Image_productId_fkey` ON `image`;

-- DropIndex
DROP INDEX `InputProduct_productId_fkey` ON `inputproduct`;

-- DropIndex
DROP INDEX `InputProduct_warehouseId_fkey` ON `inputproduct`;

-- DropIndex
DROP INDEX `WarehouseStock_productId_fkey` ON `warehousestock`;

-- DropIndex
DROP INDEX `WarehouseStock_warehouseId_fkey` ON `warehousestock`;

-- AddForeignKey
ALTER TABLE `WarehouseStock` ADD CONSTRAINT `WarehouseStock_warehouseId_fkey` FOREIGN KEY (`warehouseId`) REFERENCES `Warehouse`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WarehouseStock` ADD CONSTRAINT `WarehouseStock_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InputProduct` ADD CONSTRAINT `InputProduct_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InputProduct` ADD CONSTRAINT `InputProduct_warehouseId_fkey` FOREIGN KEY (`warehouseId`) REFERENCES `Warehouse`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
