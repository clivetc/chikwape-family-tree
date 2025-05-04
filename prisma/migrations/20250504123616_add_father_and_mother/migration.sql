/*
  Warnings:

  - You are about to drop the column `parentId` on the `FamilyMember` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "FamilyMember" DROP CONSTRAINT "FamilyMember_parentId_fkey";

-- AlterTable
ALTER TABLE "FamilyMember" DROP COLUMN "parentId",
ADD COLUMN     "fatherId" TEXT,
ADD COLUMN     "motherId" TEXT;

-- AddForeignKey
ALTER TABLE "FamilyMember" ADD CONSTRAINT "FamilyMember_fatherId_fkey" FOREIGN KEY ("fatherId") REFERENCES "FamilyMember"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FamilyMember" ADD CONSTRAINT "FamilyMember_motherId_fkey" FOREIGN KEY ("motherId") REFERENCES "FamilyMember"("id") ON DELETE SET NULL ON UPDATE CASCADE;
