/*
  Warnings:

  - You are about to drop the column `idasset` on the `image` table. All the data in the column will be lost.
  - Added the required column `asset_id` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Product_name_key` ON `product`;

-- DropIndex
DROP INDEX `Product_qrCode_key` ON `product`;

-- AlterTable
ALTER TABLE `image` DROP COLUMN `idasset`,
    ADD COLUMN `asset_id` VARCHAR(191) NOT NULL;
