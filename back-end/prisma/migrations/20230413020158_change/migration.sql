/*
  Warnings:

  - You are about to drop the column `completed` on the `goals` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('DO', 'PROGRESS', 'REVIEW', 'DONE');

-- AlterTable
ALTER TABLE "goals" DROP COLUMN "completed",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'DO';
