/*
  Warnings:

  - You are about to drop the column `idpublic` on the `image` table. All the data in the column will be lost.
  - Added the required column `public_id` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `image` DROP COLUMN `idpublic`,
    ADD COLUMN `public_id` VARCHAR(191) NOT NULL;
