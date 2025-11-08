# Spouse/Partner Feature Documentation

## Overview

The spouse feature allows you to track spouses and partners for family members in your family tree application. This includes support for:
- Single or multiple spouses (remarriage)
- Marriage dates
- Partners without formal marriage
- Birth dates for spouses

## Files Modified/Created

### Database & Schema
- ✅ `prisma/schema.prisma` - Added Spouse model
- ✅ `supabase/migrations/20241107000000_add_spouse_table.sql` - Migration file
- ✅ `supabase/migrations/20241107000001_rollback_spouse_table.sql` - Rollback file

### TypeScript Interfaces
- ✅ `interfaces/family.interface.ts` - Added ISpouse interface

### Components
- ✅ `components/FamilyNode.tsx` - Added SpouseCard component and display logic

### Services & API
- ✅ `service/spouse.service.ts` - Database operations for spouses
- ✅ `pages/api/spouses/index.ts` - API endpoints (GET, POST)
- ✅ `pages/api/spouses/[id].ts` - API endpoints (GET, PUT, DELETE)

### Documentation & Examples
- ✅ `examples/family-data-with-spouses.example.ts` - Usage examples
- ✅ `MIGRATION_GUIDE.md` - Database migration instructions
- ✅ `SPOUSE_FEATURE_README.md` - This file

## Quick Start

### 1. Run Database Migration

```bash
# Using Prisma (recommended)
npx prisma migrate dev --name add_spouse_support
npx prisma generate

# Or using Supabase
supabase db push
```

### 2. Add Spouse Data

#### Via API:
```typescript
// POST /api/spouses
const response = await fetch('/api/spouses', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: "Mary Smith",
    birthDate: "1952-03-20",
    marriageDate: "1975-06-10",
    memberId: "member-uuid-here"
  })
});
```

#### Via Prisma:
```typescript
import { PrismaClient } from "~/lib/generated/prisma";
const prisma = new PrismaClient();

await prisma.spouse.create({
  data: {
    name: "Mary Smith",
    birthDate: new Date("1952-03-20"),
    marriageDate: new Date("1975-06-10"),
    memberId: "member-uuid-here"
  }
});
```

#### Via Service:
```typescript
import SpouseService from "~/service/spouse.service";

await SpouseService.createSpouse({
  name: "Mary Smith",
  birthDate: "1952-03-20",
  marriageDate: "1975-06-10",
  memberId: "member-uuid-here"
});
```

### 3. Query Family with Spouses

```typescript
// Get member with spouses
const member = await prisma.familyMember.findUnique({
  where: { id: "member-id" },
  include: {
    spouses: true,
    children: {
      include: {
        spouses: true
      }
    }
  }
});
```

## API Endpoints

### GET /api/spouses
Get spouses by various criteria

**Query Parameters:**
- `memberId` - Get all spouses for a specific member
- `treeId` - Get all spouses in a family tree
- `search` - Search spouses by name

**Examples:**
```bash
# Get spouses for a member
GET /api/spouses?memberId=abc-123

# Search by name
GET /api/spouses?search=Mary

# Get all spouses in a tree
GET /api/spouses?treeId=tree-123
```

### POST /api/spouses
Create a new spouse

**Body:**
```json
{
  "name": "Mary Smith",
  "birthDate": "1952-03-20",
  "marriageDate": "1975-06-10",
  "memberId": "member-uuid"
}
```

### GET /api/spouses/[id]
Get a specific spouse by ID

### PUT /api/spouses/[id]
Update spouse information

**Body:**
```json
{
  "name": "Mary Johnson",
  "birthDate": "1952-03-20",
  "marriageDate": "1975-06-10"
}
```

### DELETE /api/spouses/[id]
Delete a spouse record

## UI Display

Spouses are automatically displayed in the family tree:
- Pink-themed cards below member information
- Shows marriage date (💍) if available
- Shows birth date (🎂) if no marriage date
- Heart emoji (💕) for visual appeal
- Supports multiple spouses per member

## Data Structure

### Spouse Model (Prisma)
```prisma
model Spouse {
  id            String        @id @default(uuid())
  name          String
  birthDate     DateTime?
  marriageDate  DateTime?
  memberId      String
  member        FamilyMember  @relation(...)
  createdAt     DateTime      @default(now())
}
```

### ISpouse Interface (TypeScript)
```typescript
interface ISpouse {
  id?: string;
  name: string;
  birthDate?: string;
  marriageDate?: string;
}
```

## Common Use Cases

### Add spouse to existing member
```typescript
await SpouseService.createSpouse({
  name: "Partner Name",
  memberId: "existing-member-id",
  marriageDate: "2000-01-01"
});
```

### Add multiple spouses (remarriage)
```typescript
await SpouseService.createMultipleSpouses("member-id", [
  { name: "First Spouse", marriageDate: "2000-01-01" },
  { name: "Second Spouse", marriageDate: "2010-01-01" }
]);
```

### Update spouse information
```typescript
await SpouseService.updateSpouse("spouse-id", {
  name: "Updated Name",
  marriageDate: "2005-06-15"
});
```

### Delete spouse
```typescript
await SpouseService.deleteSpouse("spouse-id");
```

## Best Practices

1. **Always include memberId** when creating a spouse
2. **Use ISO date format** for dates (YYYY-MM-DD)
3. **Handle null dates** - both birthDate and marriageDate are optional
4. **Consider privacy** - spouse information may be sensitive
5. **Validate data** before saving to database
6. **Use transactions** when creating member + spouses together

## Troubleshooting

### Spouse not showing in UI
- Ensure the member query includes `spouses: true`
- Check that spouse data exists in database
- Verify the component is receiving the data

### Migration fails
- Check database connection
- Ensure FamilyMember table exists
- Review migration logs

### API errors
- Verify memberId exists before creating spouse
- Check request body format
- Review server logs for details

## Future Enhancements

Consider adding:
- Spouse photos/avatars
- Divorce dates
- Spouse family connections
- Spouse occupation/details
- Privacy settings for spouse data
- Bulk import for spouse data

## Support

For issues or questions:
1. Check the migration guide: `MIGRATION_GUIDE.md`
2. Review example data: `examples/family-data-with-spouses.example.ts`
3. Check API logs for errors
4. Verify database schema matches Prisma schema
