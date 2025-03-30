/*
  Warnings:

  - You are about to drop the column `quantity` on the `cart` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `cartitem` DROP FOREIGN KEY `CartItem_cartId_fkey`;

-- DropIndex
DROP INDEX `CartItem_cartId_fkey` ON `cartitem`;

-- AlterTable
ALTER TABLE `cart` DROP COLUMN `quantity`,
    ADD COLUMN `quantityTot` INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `Cart`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
