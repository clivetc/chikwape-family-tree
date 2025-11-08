-- CreateTable
CREATE TABLE "Spouse" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3),
    "marriageDate" TIMESTAMP(3),
    "memberId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Spouse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Spouse_memberId_idx" ON "Spouse"("memberId");

-- AddForeignKey
ALTER TABLE "Spouse" ADD CONSTRAINT "Spouse_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "FamilyMember"("id") ON DELETE CASCADE ON UPDATE CASCADE;
