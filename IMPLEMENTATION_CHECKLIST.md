# ✅ Implementation Checklist - Spouse Feature

## Pre-Migration Checklist

- [ ] Backup your database
- [ ] Verify `.env` file has `DATABASE_URL` and `DIRECT_URL`
- [ ] Ensure Node.js and npm are installed
- [ ] Check Prisma is accessible (`npx prisma --version`)
- [ ] Stop your development server

## Migration Checklist

### Option A: Quick Migration (Recommended)
- [ ] Run: `npm run db:migrate:spouse`
- [ ] Verify no errors in output
- [ ] Check Prisma Client generated successfully

### Option B: Script Migration
- [ ] Run: `./scripts/migrate-spouse.sh`
- [ ] Follow the prompts
- [ ] Choose migration method (Prisma/Supabase/Manual)
- [ ] Verify completion message

### Option C: Manual Migration
- [ ] Run: `npx prisma migrate dev --name add_spouse_support`
- [ ] Run: `npx prisma generate`
- [ ] Verify both commands succeed

## Post-Migration Verification

- [ ] Open Prisma Studio: `npm run db:studio`
- [ ] Verify "Spouse" model appears
- [ ] Check FamilyMember has "spouses" relation
- [ ] Close Prisma Studio

## Testing Checklist

### Database Tests
- [ ] Create a test spouse via Prisma Studio
- [ ] Verify spouse appears in database
- [ ] Test cascade delete (delete member, spouse should delete)
- [ ] Test multiple spouses for one member

### API Tests
- [ ] Test POST `/api/spouses` (create spouse)
- [ ] Test GET `/api/spouses?memberId=xxx` (get by member)
- [ ] Test GET `/api/spouses/[id]` (get specific spouse)
- [ ] Test PUT `/api/spouses/[id]` (update spouse)
- [ ] Test DELETE `/api/spouses/[id]` (delete spouse)

### UI Tests
- [ ] Restart dev server: `npm run dev`
- [ ] Navigate to family tree page
- [ ] Verify spouse cards display (if data exists)
- [ ] Check pink theme on spouse cards
- [ ] Verify marriage date shows with 💍
- [ ] Verify birth date shows with 🎂
- [ ] Test on mobile view (responsive)
- [ ] Test on tablet view
- [ ] Test on desktop view
- [ ] Check hover animations work
- [ ] Verify multiple spouses display correctly

### TypeScript Tests
- [ ] No TypeScript errors in IDE
- [ ] Run: `npm run build` (should succeed)
- [ ] Check all imports resolve correctly

## Integration Checklist

### Update Your Admin Panel (If Applicable)
- [ ] Add spouse form to member creation
- [ ] Add spouse form to member editing
- [ ] Add spouse list view
- [ ] Add spouse edit/delete buttons
- [ ] Add validation for spouse data

### Update Your API Queries
- [ ] Update member queries to include spouses
- [ ] Add `include: { spouses: true }` where needed
- [ ] Update family tree data fetching
- [ ] Test all existing queries still work

### Update Your Data Import (If Applicable)
- [ ] Update import scripts to handle spouses
- [ ] Test importing members with spouses
- [ ] Verify spouse relationships are correct

## Documentation Review

- [ ] Read `QUICK_START_SPOUSE.md`
- [ ] Review `MIGRATION_GUIDE.md`
- [ ] Check `SPOUSE_FEATURE_README.md`
- [ ] Look at `examples/family-data-with-spouses.example.ts`
- [ ] Review `VISUAL_GUIDE.md` for UI details

## Code Review Checklist

### Files to Review
- [ ] `prisma/schema.prisma` - Spouse model added
- [ ] `interfaces/family.interface.ts` - ISpouse interface
- [ ] `components/FamilyNode.tsx` - SpouseCard component
- [ ] `service/spouse.service.ts` - Service methods
- [ ] `pages/api/spouses/index.ts` - API endpoints
- [ ] `pages/api/spouses/[id].ts` - API endpoints

### Code Quality
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] Proper error handling in API
- [ ] Consistent naming conventions
- [ ] Comments where needed

## Production Readiness

### Before Deploying
- [ ] Test migration on staging database first
- [ ] Backup production database
- [ ] Plan rollback strategy
- [ ] Test all features in staging
- [ ] Review performance impact

### Deployment Steps
- [ ] Push code to repository
- [ ] Run migration on production database
- [ ] Deploy application
- [ ] Verify deployment successful
- [ ] Test production site
- [ ] Monitor for errors

### Post-Deployment
- [ ] Check production logs
- [ ] Verify spouse feature works
- [ ] Test API endpoints
- [ ] Monitor database performance
- [ ] Gather user feedback

## Optional Enhancements

### Future Features to Consider
- [ ] Add spouse photos/avatars
- [ ] Add divorce dates
- [ ] Add spouse occupation
- [ ] Add spouse family connections
- [ ] Add privacy settings for spouse data
- [ ] Add bulk spouse import
- [ ] Add spouse search functionality
- [ ] Add spouse statistics/reports

### UI Enhancements
- [ ] Add spouse edit modal
- [ ] Add spouse delete confirmation
- [ ] Add spouse quick-add button
- [ ] Add spouse timeline view
- [ ] Add spouse relationship type (married/partner/etc)

## Troubleshooting Checklist

### If Migration Fails
- [ ] Check database connection
- [ ] Verify `.env` variables
- [ ] Check database permissions
- [ ] Review error messages
- [ ] Try manual SQL migration
- [ ] Check Prisma version compatibility

### If Spouses Don't Show in UI
- [ ] Verify data exists in database
- [ ] Check query includes `spouses: true`
- [ ] Verify component receives data
- [ ] Check browser console for errors
- [ ] Verify Prisma Client is regenerated

### If API Errors Occur
- [ ] Check server logs
- [ ] Verify memberId exists
- [ ] Check request body format
- [ ] Verify database connection
- [ ] Test with Postman/curl

### If TypeScript Errors
- [ ] Run `npx prisma generate`
- [ ] Restart TypeScript server
- [ ] Check import paths
- [ ] Verify types are exported

## Success Criteria

✅ Migration completed without errors
✅ Spouse table exists in database
✅ Prisma Client includes Spouse model
✅ API endpoints respond correctly
✅ UI displays spouse cards
✅ No TypeScript errors
✅ No runtime errors
✅ Mobile responsive works
✅ All tests pass
✅ Documentation is clear

## Final Steps

- [ ] Mark this checklist as complete
- [ ] Document any issues encountered
- [ ] Share with team (if applicable)
- [ ] Update project documentation
- [ ] Celebrate! 🎉

---

## Quick Reference

**Migration Command:**
```bash
npm run db:migrate:spouse
```

**Verify Migration:**
```bash
npm run db:studio
```

**Test API:**
```bash
curl -X POST http://localhost:3000/api/spouses \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Spouse","memberId":"xxx"}'
```

**Rollback (if needed):**
```bash
psql $DATABASE_URL < supabase/migrations/20241107000001_rollback_spouse_table.sql
```

---

Good luck with your implementation! 🦓🌳
