-- DropForeignKey
ALTER TABLE "FamilyMember" DROP CONSTRAINT "FamilyMember_treeId_fkey";

-- AlterTable
ALTER TABLE "FamilyMember" ALTER COLUMN "treeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "FamilyMember" ADD CONSTRAINT "FamilyMember_treeId_fkey" FOREIGN KEY ("treeId") REFERENCES "FamilyTree"("id") ON DELETE SET NULL ON UPDATE CASCADE;
