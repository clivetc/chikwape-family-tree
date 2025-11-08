-- Migration: Enhance Spouse table with relationship status tracking
-- Created: 2024-11-07
-- This migration adds support for:
-- - Tracking divorce dates
-- - Relationship status (married, divorced, widowed, partner)
-- - Marriage order (1st, 2nd, 3rd spouse)
-- - Updated timestamp

-- Add new columns to Spouse table
ALTER TABLE "Spouse" 
ADD COLUMN IF NOT EXISTS "divorceDate" TIMESTAMP(3),
ADD COLUMN IF NOT EXISTS "status" TEXT NOT NULL DEFAULT 'married',
ADD COLUMN IF NOT EXISTS "order" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Create index for status queries
CREATE INDEX IF NOT EXISTS "Spouse_status_idx" ON "Spouse"("status");

-- Add check constraint for valid status values
ALTER TABLE "Spouse" 
ADD CONSTRAINT "Spouse_status_check" 
CHECK ("status" IN ('married', 'divorced', 'widowed', 'partner'));

-- Add check constraint for order (must be positive)
ALTER TABLE "Spouse" 
ADD CONSTRAINT "Spouse_order_check" 
CHECK ("order" > 0);

-- Create trigger to auto-update updatedAt timestamp
CREATE OR REPLACE FUNCTION update_spouse_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER spouse_updated_at_trigger
    BEFORE UPDATE ON "Spouse"
    FOR EACH ROW
    EXECUTE FUNCTION update_spouse_updated_at();

-- Add comments for documentation
COMMENT ON COLUMN "Spouse"."divorceDate" IS 'Date when the marriage ended (if divorced)';
COMMENT ON COLUMN "Spouse"."status" IS 'Current relationship status: married, divorced, widowed, or partner';
COMMENT ON COLUMN "Spouse"."order" IS 'Order of marriage (1 for first spouse, 2 for second, etc.)';
COMMENT ON COLUMN "Spouse"."updatedAt" IS 'Timestamp when the record was last updated';

-- Update existing records to have proper order
WITH numbered_spouses AS (
    SELECT 
        id,
        ROW_NUMBER() OVER (PARTITION BY "memberId" ORDER BY "marriageDate" NULLS LAST, "createdAt") as row_num
    FROM "Spouse"
)
UPDATE "Spouse" s
SET "order" = ns.row_num
FROM numbered_spouses ns
WHERE s.id = ns.id;
