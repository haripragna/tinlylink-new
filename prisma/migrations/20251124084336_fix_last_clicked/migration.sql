/*
  Warnings:

  - The primary key for the `Link` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Link` table. All the data in the column will be lost.
  - The `id` column on the `Link` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Link" DROP CONSTRAINT "Link_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "lastClicked" SET DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "Link_pkey" PRIMARY KEY ("id");
