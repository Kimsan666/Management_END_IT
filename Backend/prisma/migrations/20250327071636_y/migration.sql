/*
  Warnings:

  - You are about to drop the column `dateOfEmployment` on the `employee` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumberId` on the `employee` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Warehouse` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Warehouse` table without a default value. This is not possible if the table is not empty.
  - Made the column `contact` on table `warehouse` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `employee` DROP FOREIGN KEY `Employee_phoneNumberId_fkey`;

-- DropIndex
DROP INDEX `Employee_phoneNumberId_fkey` ON `employee`;

-- AlterTable
ALTER TABLE `employee` DROP COLUMN `dateOfEmployment`,
    DROP COLUMN `phoneNumberId`;

-- AlterTable
ALTER TABLE `phonenumber` ADD COLUMN `employeeId` INTEGER NULL;

-- AlterTable
ALTER TABLE `warehouse` ADD COLUMN `email` VARCHAR(191) NOT NULL,
    MODIFY `contact` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Warehouse_email_key` ON `Warehouse`(`email`);

-- AddForeignKey
ALTER TABLE `PhoneNumber` ADD CONSTRAINT `PhoneNumber_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
