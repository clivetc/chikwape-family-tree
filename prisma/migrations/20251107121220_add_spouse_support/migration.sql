/*
  Warnings:

  - Added the required column `updatedAt` to the `Spouse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Spouse" ADD COLUMN     "divorceDate" TIMESTAMP(3),
ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'married',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "Spouse_status_idx" ON "Spouse"("status");
