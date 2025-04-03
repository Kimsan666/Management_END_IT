-- DropForeignKey
ALTER TABLE `cart` DROP FOREIGN KEY `Cart_userId_fkey`;

-- DropForeignKey
ALTER TABLE `cartitem` DROP FOREIGN KEY `CartItem_warehouseStockId_fkey`;

-- DropForeignKey
ALTER TABLE `inputproduct` DROP FOREIGN KEY `InputProduct_categoryIdCt_fkey`;

-- DropForeignKey
ALTER TABLE `inputproduct` DROP FOREIGN KEY `InputProduct_unitIdUt_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_userId_fkey`;

-- DropForeignKey
ALTER TABLE `orderitem` DROP FOREIGN KEY `OrderItem_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `orderitem` DROP FOREIGN KEY `OrderItem_warehouseStockId_fkey`;

-- DropForeignKey
ALTER TABLE `phonenumber` DROP FOREIGN KEY `PhoneNumber_employeeId_fkey`;

-- DropForeignKey
ALTER TABLE `purchaseorderitem` DROP FOREIGN KEY `PurchaseOrderItem_purchaseOrderId_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_employeeId_fkey`;

-- DropIndex
DROP INDEX `Cart_userId_fkey` ON `cart`;

-- DropIndex
DROP INDEX `CartItem_warehouseStockId_fkey` ON `cartitem`;

-- DropIndex
DROP INDEX `InputProduct_categoryIdCt_fkey` ON `inputproduct`;

-- DropIndex
DROP INDEX `InputProduct_unitIdUt_fkey` ON `inputproduct`;

-- DropIndex
DROP INDEX `Order_userId_fkey` ON `order`;

-- DropIndex
DROP INDEX `OrderItem_orderId_fkey` ON `orderitem`;

-- DropIndex
DROP INDEX `OrderItem_warehouseStockId_fkey` ON `orderitem`;

-- DropIndex
DROP INDEX `PhoneNumber_employeeId_fkey` ON `phonenumber`;

-- DropIndex
DROP INDEX `PurchaseOrderItem_purchaseOrderId_fkey` ON `purchaseorderitem`;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `InputProduct` ADD CONSTRAINT `InputProduct_categoryIdCt_fkey` FOREIGN KEY (`categoryIdCt`) REFERENCES `Category`(`idCt`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `InputProduct` ADD CONSTRAINT `InputProduct_unitIdUt_fkey` FOREIGN KEY (`unitIdUt`) REFERENCES `Unit`(`idUt`) ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE `PurchaseOrderItem` ADD CONSTRAINT `PurchaseOrderItem_purchaseOrderId_fkey` FOREIGN KEY (`purchaseOrderId`) REFERENCES `PurchaseOrder`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_warehouseStockId_fkey` FOREIGN KEY (`warehouseStockId`) REFERENCES `WarehouseStock`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_warehouseStockId_fkey` FOREIGN KEY (`warehouseStockId`) REFERENCES `WarehouseStock`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PhoneNumber` ADD CONSTRAINT `PhoneNumber_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
