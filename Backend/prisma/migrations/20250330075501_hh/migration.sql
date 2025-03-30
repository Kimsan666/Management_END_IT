/*
  Warnings:

  - Added the required column `nameCtm` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cart` ADD COLUMN `carRegis` VARCHAR(191) NULL,
    ADD COLUMN `nameCtm` VARCHAR(191) NOT NULL,
    ADD COLUMN `nameDriver` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `order` ADD COLUMN `quantityTot` INTEGER NOT NULL DEFAULT 0;
