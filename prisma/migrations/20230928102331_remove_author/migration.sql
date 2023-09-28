/*
  Warnings:

  - You are about to drop the column `authorId` on the `Page` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Page" DROP CONSTRAINT "Page_authorId_fkey";

-- AlterTable
ALTER TABLE "Page" DROP COLUMN "authorId";
