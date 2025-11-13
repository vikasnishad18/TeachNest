/*
  Warnings:

  - You are about to drop the column `createdBy` on the `course` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `course` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `course` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - Made the column `description` on table `course` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `course` DROP FOREIGN KEY `Course_createdBy_fkey`;

-- DropIndex
DROP INDEX `Course_createdBy_fkey` ON `course`;

-- AlterTable
ALTER TABLE `course` DROP COLUMN `createdBy`,
    DROP COLUMN `price`,
    DROP COLUMN `published`,
    MODIFY `description` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `name`,
    MODIFY `role` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER';
