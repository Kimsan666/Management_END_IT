-- DropForeignKey
ALTER TABLE `warehousestock` DROP FOREIGN KEY `WarehouseStock_categoryIdCt_fkey`;

-- DropForeignKey
ALTER TABLE `warehousestock` DROP FOREIGN KEY `WarehouseStock_unitIdUt_fkey`;

-- DropIndex
DROP INDEX `WarehouseStock_categoryIdCt_fkey` ON `warehousestock`;

-- DropIndex
DROP INDEX `WarehouseStock_unitIdUt_fkey` ON `warehousestock`;

-- AddForeignKey
ALTER TABLE `WarehouseStock` ADD CONSTRAINT `WarehouseStock_unitIdUt_fkey` FOREIGN KEY (`unitIdUt`) REFERENCES `Unit`(`idUt`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `WarehouseStock` ADD CONSTRAINT `WarehouseStock_categoryIdCt_fkey` FOREIGN KEY (`categoryIdCt`) REFERENCES `Category`(`idCt`) ON DELETE SET NULL ON UPDATE SET NULL;
