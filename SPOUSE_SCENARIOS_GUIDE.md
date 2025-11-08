# 💕 Spouse Scenarios Guide

## Overview

The enhanced spouse feature now supports:
- ✅ **Auto-generated IDs** - Database automatically creates UUID
- ✅ **Multiple partners** - Track remarriage and multiple relationships
- ✅ **Relationship status** - Married, divorced, widowed, or partner
- ✅ **Marriage order** - Automatically tracks 1st, 2nd, 3rd spouse
- ✅ **Divorce dates** - Track when relationships ended
- ✅ **Visual indicators** - Different colors and emojis for each status

## Relationship Statuses

### 1. Married (💍)
- **Color**: Pink
- **Use**: Currently married spouse
- **Fields**: name, marriageDate, birthDate (optional)

```typescript
{
  name: "Mary Smith",
  marriageDate: "1975-06-10",
  status: "married",
  order: 1
}
```

### 2. Divorced (💔)
- **Color**: Gray
- **Use**: Former spouse (divorced)
- **Fields**: name, marriageDate, divorceDate

```typescript
{
  name: "Sarah Johnson",
  marriageDate: "2000-04-20",
  divorceDate: "2012-11-15",
  status: "divorced",
  order: 1
}
```

### 3. Widowed (🕊️)
- **Color**: Purple
- **Use**: Deceased spouse
- **Fields**: name, marriageDate

```typescript
{
  name: "Peter Wilson",
  marriageDate: "2005-07-15",
  status: "widowed",
  order: 1
}
```

### 4. Partner (💕)
- **Color**: Blue
- **Use**: Unmarried partner/companion
- **Fields**: name, birthDate (optional)

```typescript
{
  name: "Michael Davis",
  birthDate: "2000-07-22",
  status: "partner",
  order: 1
}
```

## Common Scenarios

### Scenario 1: Single Marriage (Still Married)

```typescript
await SpouseService.createSpouse({
  name: "Mary Smith",
  birthDate: "1952-03-20",
  marriageDate: "1975-06-10",
  status: "married",
  memberId: "john-id"
});
// ID auto-generated ✅
// Order auto-set to 1 ✅
```

**UI Display:**
```
┌─────────────────────┐
│ 👤 Mary Smith 💍    │
│ 💍 Married: 1975... │
└─────────────────────┘
```

### Scenario 2: Remarriage (Divorced then Remarried)

```typescript
// Step 1: Add first spouse
await SpouseService.createSpouse({
  name: "Sarah Johnson",
  marriageDate: "2000-04-20",
  status: "married",
  memberId: "david-id"
});

// Step 2: Mark as divorced
await SpouseService.markAsDivorced("sarah-spouse-id", "2012-11-15");

// Step 3: Add second spouse
await SpouseService.createSpouse({
  name: "Lisa Brown",
  marriageDate: "2015-09-12",
  status: "married",
  memberId: "david-id"
});
// Order auto-set to 2 ✅
```

**UI Display:**
```
┌─────────────────────┐
│ 👤 Sarah Johnson 💔 │
│ [2nd]               │
│ 💍 Married: 2000... │
│ 💔 Divorced: 2012...│
└─────────────────────┘
┌─────────────────────┐
│ 👤 Lisa Brown 💍    │
│ [2nd]               │
│ 💍 Married: 2015... │
└─────────────────────┘
```

### Scenario 3: Widowed then Remarried

```typescript
// First spouse (deceased)
await SpouseService.createSpouse({
  name: "Peter Wilson",
  marriageDate: "2005-07-15",
  status: "widowed",
  memberId: "grace-id"
});

// Second spouse (current)
await SpouseService.createSpouse({
  name: "Thomas Anderson",
  marriageDate: "2020-06-20",
  status: "married",
  memberId: "grace-id"
});
```

### Scenario 4: Multiple Marriages (3+)

```typescript
await SpouseService.createMultipleSpouses("robert-id", [
  {
    name: "First Wife",
    marriageDate: "1980-05-10",
    divorceDate: "1990-03-15",
    status: "divorced"
  },
  {
    name: "Second Wife",
    marriageDate: "1992-08-20",
    divorceDate: "2005-12-10",
    status: "divorced"
  },
  {
    name: "Third Wife",
    marriageDate: "2008-04-15",
    status: "married"
  }
]);
// Orders auto-assigned: 1, 2, 3 ✅
```

**UI Display:**
```
┌─────────────────────┐
│ 👤 First Wife 💔    │
│ [1st]               │
│ 💔 Divorced: 1990...│
└─────────────────────┘
┌─────────────────────┐
│ 👤 Second Wife 💔   │
│ [2nd]               │
│ 💔 Divorced: 2005...│
└─────────────────────┘
┌─────────────────────┐
│ 👤 Third Wife 💍    │
│ [3rd]               │
│ 💍 Married: 2008... │
└─────────────────────┘
```

### Scenario 5: Unmarried Partner

```typescript
await SpouseService.createSpouse({
  name: "Michael Davis",
  birthDate: "2000-07-22",
  status: "partner",
  memberId: "emma-id"
  // No marriageDate needed
});
```

**UI Display:**
```
┌─────────────────────┐
│ 👤 Michael Davis 💕 │
│ 🎂 Born: 2000...    │
└─────────────────────┘
```

## API Operations

### Create Spouse (ID Auto-Generated)

```bash
POST /api/spouses
{
  "name": "Mary Smith",
  "birthDate": "1952-03-20",
  "marriageDate": "1975-06-10",
  "status": "married",
  "memberId": "member-uuid"
}
# Response includes auto-generated ID
```

### Mark as Divorced

```typescript
await SpouseService.markAsDivorced("spouse-id", "2012-11-15");
```

### Mark as Widowed

```typescript
await SpouseService.markAsWidowed("spouse-id");
```

### Get Current Spouses Only

```typescript
const current = await SpouseService.getCurrentSpousesByMemberId("member-id");
// Returns only married or partner status
```

### Get Former Spouses Only

```typescript
const former = await SpouseService.getFormerSpousesByMemberId("member-id");
// Returns only divorced or widowed status
```

## Database Schema

### Spouse Table Fields

| Field | Type | Auto | Description |
|-------|------|------|-------------|
| id | UUID | ✅ Yes | Auto-generated by database |
| name | TEXT | No | Spouse name |
| birthDate | TIMESTAMP | No | Birth date (optional) |
| marriageDate | TIMESTAMP | No | Marriage date (optional) |
| divorceDate | TIMESTAMP | No | Divorce date (optional) |
| status | TEXT | ✅ Yes | Default: "married" |
| order | INT | ✅ Yes | Auto-calculated (1, 2, 3...) |
| memberId | UUID | No | Foreign key to FamilyMember |
| createdAt | TIMESTAMP | ✅ Yes | Auto-set on creation |
| updatedAt | TIMESTAMP | ✅ Yes | Auto-updated on change |

## Migration Steps

### Run Enhanced Migration

```bash
# Option 1: Prisma
npx prisma migrate dev --name enhance_spouse_support
npx prisma generate

# Option 2: Supabase SQL
# Run: supabase/migrations/20241107000002_enhance_spouse_table.sql
```

### Verify Migration

```bash
npm run db:studio
# Check Spouse table has new columns:
# - divorceDate
# - status
# - order
# - updatedAt
```

## UI Color Coding

| Status | Background | Border | Avatar | Emoji |
|--------|-----------|--------|--------|-------|
| Married | Pink.50 | Pink.200 | Pink.400 | 💍 |
| Divorced | Gray.50 | Gray.300 | Gray.400 | 💔 |
| Widowed | Purple.50 | Purple.200 | Purple.400 | 🕊️ |
| Partner | Blue.50 | Blue.200 | Blue.400 | 💕 |

## Best Practices

### 1. Always Let Database Generate IDs
```typescript
// ✅ Good - Let DB generate ID
await SpouseService.createSpouse({
  name: "Mary Smith",
  memberId: "member-id"
});

// ❌ Bad - Don't manually set ID
await SpouseService.createSpouse({
  id: "manual-id", // Don't do this
  name: "Mary Smith",
  memberId: "member-id"
});
```

### 2. Let Order Auto-Calculate
```typescript
// ✅ Good - Order auto-calculated
await SpouseService.createSpouse({
  name: "Second Wife",
  memberId: "member-id"
  // order will be 2 automatically
});

// ⚠️ Only set order manually if you have a specific reason
```

### 3. Use Status Helpers
```typescript
// ✅ Good - Use helper methods
await SpouseService.markAsDivorced("spouse-id", "2012-11-15");

// ❌ Less ideal - Manual update
await SpouseService.updateSpouse("spouse-id", {
  status: "divorced",
  divorceDate: "2012-11-15"
});
```

### 4. Query by Status
```typescript
// ✅ Get only current relationships
const current = await SpouseService.getCurrentSpousesByMemberId("id");

// ✅ Get only past relationships
const former = await SpouseService.getFormerSpousesByMemberId("id");

// ✅ Get all
const all = await SpouseService.getSpousesByMemberId("id");
```

## Troubleshooting

### Issue: Order not auto-calculating
**Solution**: Ensure you're using `SpouseService.createSpouse()` not direct Prisma

### Issue: ID not auto-generated
**Solution**: Don't include `id` field in create request, let DB handle it

### Issue: Status colors not showing
**Solution**: Run migration to add status column, regenerate Prisma client

### Issue: Multiple spouses showing wrong order
**Solution**: Use `SpouseService.createMultipleSpouses()` for batch creation

## Examples File

See `examples/spouse-scenarios.example.ts` for complete code examples of all scenarios.

## Summary

✅ **IDs**: Auto-generated by database (UUID)
✅ **Order**: Auto-calculated (1st, 2nd, 3rd spouse)
✅ **Status**: Tracks married, divorced, widowed, partner
✅ **Dates**: Marriage and divorce dates
✅ **UI**: Color-coded cards with status emojis
✅ **API**: Helper methods for common operations

Your family tree now handles all real-world relationship scenarios! 🦓💕
