-- AlterTable
ALTER TABLE `inputproduct` ADD COLUMN `categoryIdCt` INTEGER NULL,
    ADD COLUMN `minimumStock` INTEGER NOT NULL DEFAULT 50,
    ADD COLUMN `unitIdUt` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `InputProduct` ADD CONSTRAINT `InputProduct_categoryIdCt_fkey` FOREIGN KEY (`categoryIdCt`) REFERENCES `Category`(`idCt`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InputProduct` ADD CONSTRAINT `InputProduct_unitIdUt_fkey` FOREIGN KEY (`unitIdUt`) REFERENCES `Unit`(`idUt`) ON DELETE SET NULL ON UPDATE CASCADE;
