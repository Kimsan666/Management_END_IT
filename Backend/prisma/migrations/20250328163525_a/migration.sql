/*
  Warnings:

  - You are about to drop the column `status` on the `cart` table. All the data in the column will be lost.
  - Added the required column `quantity` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cart` DROP COLUMN `status`,
    ADD COLUMN `quantity` INTEGER NOT NULL;
