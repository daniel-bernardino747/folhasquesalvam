-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('HIGH', 'MEDIUM', 'LOW');

-- AlterTable
ALTER TABLE "goals" ADD COLUMN     "difficulty" "Difficulty" NOT NULL DEFAULT 'LOW';
