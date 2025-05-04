/*
  Warnings:

  - You are about to drop the column `fatherId` on the `FamilyMember` table. All the data in the column will be lost.
  - You are about to drop the column `motherId` on the `FamilyMember` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "FamilyMember" DROP CONSTRAINT "FamilyMember_fatherId_fkey";

-- DropForeignKey
ALTER TABLE "FamilyMember" DROP CONSTRAINT "FamilyMember_motherId_fkey";

-- AlterTable
ALTER TABLE "FamilyMember" DROP COLUMN "fatherId",
DROP COLUMN "motherId",
ADD COLUMN     "parentId" TEXT;

-- AddForeignKey
ALTER TABLE "FamilyMember" ADD CONSTRAINT "FamilyMember_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "FamilyMember"("id") ON DELETE SET NULL ON UPDATE CASCADE;
