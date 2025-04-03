-- DropForeignKey
ALTER TABLE `purchaseorderitem` DROP FOREIGN KEY `PurchaseOrderItem_productId_fkey`;

-- DropIndex
DROP INDEX `PurchaseOrderItem_productId_fkey` ON `purchaseorderitem`;

-- AddForeignKey
ALTER TABLE `PurchaseOrderItem` ADD CONSTRAINT `PurchaseOrderItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
