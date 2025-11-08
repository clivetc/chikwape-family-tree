# Database Migration Guide - Adding Spouse Support

This guide will help you migrate your database to support spouse/partner information for family members.

## Overview

The migration adds a new `Spouse` table that stores information about spouses and partners of family members, including:
- Spouse name
- Birth date (optional)
- Marriage date (optional)
- Relationship to family member

## Prerequisites

- Ensure you have a backup of your database
- Make sure your `.env` file has the correct database connection strings
- Have Prisma CLI installed (`npm install -g prisma` or use `npx prisma`)

## Migration Steps

### Option 1: Using Prisma (Recommended)

1. **Generate the migration:**
   ```bash
   npx prisma migrate dev --name add_spouse_support
   ```

2. **Apply the migration:**
   The command above will automatically apply the migration. If you need to apply it manually:
   ```bash
   npx prisma migrate deploy
   ```

3. **Generate Prisma Client:**
   ```bash
   npx prisma generate
   ```

### Option 2: Using Supabase

If you're using Supabase directly:

1. **Apply the migration via Supabase CLI:**
   ```bash
   supabase db push
   ```

2. **Or apply via SQL Editor in Supabase Dashboard:**
   - Go to your Supabase project dashboard
   - Navigate to SQL Editor
   - Copy the contents of `supabase/migrations/20241107000000_add_spouse_table.sql`
   - Run the SQL

3. **Or use the migration file:**
   ```bash
   supabase migration up
   ```

### Option 3: Manual SQL Execution

If you prefer to run SQL directly:

1. Connect to your PostgreSQL database
2. Execute the SQL from `supabase/migrations/20241107000000_add_spouse_table.sql`

## Verification

After migration, verify the changes:

```bash
# Check Prisma schema
npx prisma db pull

# Or check in database
psql $DATABASE_URL -c "\d Spouse"
```

## Rollback (If Needed)

If you need to rollback the migration:

### Using Prisma:
```bash
npx prisma migrate resolve --rolled-back add_spouse_support
```

### Using Supabase:
Run the rollback SQL:
```bash
psql $DATABASE_URL < supabase/migrations/20241107000001_rollback_spouse_table.sql
```

**⚠️ Warning:** Rollback will delete all spouse data permanently!

## Database Schema Changes

### New Table: Spouse

| Column | Type | Nullable | Description |
|--------|------|----------|-------------|
| id | TEXT (UUID) | No | Primary key |
| name | TEXT | No | Spouse/partner name |
| birthDate | TIMESTAMP | Yes | Birth date |
| marriageDate | TIMESTAMP | Yes | Marriage date |
| memberId | TEXT | No | Foreign key to FamilyMember |
| createdAt | TIMESTAMP | No | Record creation timestamp |

### Relationships

- `Spouse.memberId` → `FamilyMember.id` (Many-to-One)
- Cascade delete: When a FamilyMember is deleted, their spouses are also deleted

## Example Usage

After migration, you can create spouse records:

```typescript
// Create a family member with spouse
const member = await prisma.familyMember.create({
  data: {
    name: "John Chikwape",
    birthDate: new Date("1950-01-15"),
    spouses: {
      create: [
        {
          name: "Mary Smith",
          birthDate: new Date("1952-03-20"),
          marriageDate: new Date("1975-06-10"),
        }
      ]
    }
  },
  include: {
    spouses: true
  }
});

// Add spouse to existing member
await prisma.spouse.create({
  data: {
    name: "Sarah Johnson",
    birthDate: new Date("1978-05-15"),
    marriageDate: new Date("2000-04-20"),
    memberId: "existing-member-id"
  }
});

// Query member with spouses
const memberWithSpouses = await prisma.familyMember.findUnique({
  where: { id: "member-id" },
  include: {
    spouses: true,
    children: true
  }
});
```

## Troubleshooting

### Error: "relation already exists"
The table might already exist. Check your database or skip this migration.

### Error: "foreign key constraint"
Ensure the FamilyMember table exists before running this migration.

### Connection issues
Verify your `DATABASE_URL` and `DIRECT_URL` in `.env` file.

## Support

If you encounter issues:
1. Check Prisma logs: `npx prisma migrate status`
2. Verify database connection: `npx prisma db pull`
3. Check Supabase logs in the dashboard

## Next Steps

After successful migration:
1. Update your API endpoints to handle spouse data
2. Test the UI with spouse information
3. Update any existing data import scripts
4. Consider adding validation for spouse data
