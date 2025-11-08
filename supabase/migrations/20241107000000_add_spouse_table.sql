-- Migration: Add Spouse table to support family member spouses/partners
-- Created: 2024-11-07

-- Create Spouse table
CREATE TABLE IF NOT EXISTS "Spouse" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "name" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3),
    "marriageDate" TIMESTAMP(3),
    "memberId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT "Spouse_memberId_fkey" FOREIGN KEY ("memberId") 
        REFERENCES "FamilyMember"("id") 
        ON DELETE CASCADE 
        ON UPDATE CASCADE
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS "Spouse_memberId_idx" ON "Spouse"("memberId");

-- Add comments for documentation
COMMENT ON TABLE "Spouse" IS 'Stores spouse/partner information for family members';
COMMENT ON COLUMN "Spouse"."id" IS 'Unique identifier for the spouse record';
COMMENT ON COLUMN "Spouse"."name" IS 'Full name of the spouse/partner';
COMMENT ON COLUMN "Spouse"."birthDate" IS 'Birth date of the spouse (optional)';
COMMENT ON COLUMN "Spouse"."marriageDate" IS 'Date of marriage (optional, can be null for partners)';
COMMENT ON COLUMN "Spouse"."memberId" IS 'Foreign key to FamilyMember table';
COMMENT ON COLUMN "Spouse"."createdAt" IS 'Timestamp when the record was created';
