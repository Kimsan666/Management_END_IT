/*
  Warnings:

  - You are about to drop the column `SecureUrl` on the `image` table. All the data in the column will be lost.
  - Added the required column `secure_url` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `image` DROP COLUMN `SecureUrl`,
    ADD COLUMN `secure_url` VARCHAR(191) NOT NULL;
