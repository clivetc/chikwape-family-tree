-- Rollback Migration: Remove Spouse table
-- This migration can be used to rollback the spouse table changes if needed

-- Drop the index first
DROP INDEX IF EXISTS "Spouse_memberId_idx";

-- Drop the Spouse table (CASCADE will remove foreign key constraints)
DROP TABLE IF EXISTS "Spouse" CASCADE;

-- Note: This will permanently delete all spouse data
-- Make sure to backup your data before running this rollback
