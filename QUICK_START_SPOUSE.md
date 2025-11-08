# Quick Start - Spouse Feature

## 🚀 Run Migrations (Both Required)

### Step 1: Initial Spouse Table
```bash
npx prisma migrate dev --name add_spouse_support
```

### Step 2: Enhanced Features (Status, Order, etc.)
```bash
npx prisma migrate dev --name enhance_spouse_support
```

### Step 3: Generate Prisma Client
```bash
npx prisma generate
```

### Or Use Supabase
```bash
# Run both SQL files in order:
# 1. supabase/migrations/20241107000000_add_spouse_table.sql
# 2. supabase/migrations/20241107000002_enhance_spouse_table.sql
supabase db push
npx prisma generate
```

## ✅ Verify Migration

```bash
# Check if Spouse table exists
npx prisma studio
# Look for "Spouse" model in the UI
```

## 📝 Add Spouse Data

### Example 1: Single Spouse (Married)
```typescript
await SpouseService.createSpouse({
  name: "Mary Smith",
  birthDate: "1952-03-20",
  marriageDate: "1975-06-10",
  status: "married",
  memberId: "your-member-id"
});
// ✅ ID auto-generated
// ✅ Order auto-set to 1
```

### Example 2: Remarriage (Multiple Spouses)
```typescript
// First spouse (divorced)
await SpouseService.createSpouse({
  name: "Sarah Johnson",
  marriageDate: "2000-04-20",
  divorceDate: "2012-11-15",
  status: "divorced",
  memberId: "your-member-id"
});

// Second spouse (current)
await SpouseService.createSpouse({
  name: "Lisa Brown",
  marriageDate: "2015-09-12",
  status: "married",
  memberId: "your-member-id"
});
// ✅ Order auto-set to 2
```

### Example 3: Partner (Not Married)
```typescript
await SpouseService.createSpouse({
  name: "Michael Davis",
  birthDate: "2000-07-22",
  status: "partner",
  memberId: "your-member-id"
  // No marriageDate needed
});
```

### Example 4: Mark as Divorced
```typescript
await SpouseService.markAsDivorced("spouse-id", "2012-11-15");
```

## 🎨 UI Display

Spouses automatically appear with color-coded status:
- 💍 **Married** - Pink cards
- 💔 **Divorced** - Gray cards
- 🕊️ **Widowed** - Purple cards
- 💕 **Partner** - Blue cards
- 🏷️ Order badges (2nd, 3rd spouse)
- Beautiful animations

## 📚 Full Documentation

- **Scenarios Guide**: `SPOUSE_SCENARIOS_GUIDE.md` ⭐ Start here!
- **Migration Guide**: `MIGRATION_GUIDE.md`
- **Feature Guide**: `SPOUSE_FEATURE_README.md`
- **Examples**: `examples/spouse-scenarios.example.ts`

## 🆘 Troubleshooting

**Migration fails?**
- Check your `.env` file has `DATABASE_URL` and `DIRECT_URL`
- Ensure database is accessible
- Review error messages

**Spouses not showing?**
- Verify migration ran successfully
- Check data exists: `npx prisma studio`
- Ensure query includes `spouses: true`

**Need to rollback?**
```bash
# Run the rollback SQL
psql $DATABASE_URL < supabase/migrations/20241107000001_rollback_spouse_table.sql
```

## 🎉 That's It!

Your family tree now supports spouses and partners!
