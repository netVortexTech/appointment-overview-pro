# Admin Panel Connection — palmcleaners.vercel.app ↔ admin.palmcleaners.vercel.app

Shared Supabase: `https://xsbxktytzqwdkgrqfytm.supabase.co` (migrated 21 tables, RLS, `generate_ticket_number` → `PC-2026-00001`)

## Vercel Env (both projects must share the same Supabase)

On **palmcleaners.vercel.app** Vercel → Settings → Environment Variables (Production/Preview):
```
VITE_SUPABASE_URL=https://xsbxktytzqwdkgrqfytm.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_ha8F4Gd4j-TyV24718AGoA_q7rXzWog
SUPABASE_URL=https://xsbxktytzqwdkgrqfytm.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhzYnhrdHl0enF3ZGtncnFmeXRtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODI1NTQzNSwiZXhwIjoyMTAzODMxNDM1fQ.hiSmnyMFl5PF7W2CL2_3HDSZyt7jmkMNd1eqt2e2qI0
VITE_ADMIN_URL=https://admin.palmcleaners.vercel.app
```

On **admin.palmcleaners.vercel.app** (Default Project):
```
NEXT_PUBLIC_SUPABASE_URL=https://xsbxktytzqwdkgrqfytm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...Anon
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...service_role
SUPABASE_DB_PASSWORD=Palm@2026cleaneres
```

## What 00004 does
- Public read for anon on `services`/`products`/`service_categories` where `is_active`
- Compat triggers so existing `booking.functions.ts` direct inserts still work (business_id default, ticket auto-gen, phone_number ↔ phone, description/notes sync, booking_services service_slug → service_id)
- Seeds 11 services + 2 products from hardcoded `src/lib/services.ts`

## Booking flow
- `src/lib/booking.functions.ts` now tries `POST ${VITE_ADMIN_URL}/api/webhooks/website-booking` first (single sanctioned writer: `find_or_create_customer` + `generate_ticket_number` via service_role). Falls back to direct `supabaseAdmin` insert if admin not reachable (compat triggers).
- Admin webhook is `Default Project/src/app/api/webhooks/website-booking/route.ts:1`

## Catalog
- Services/products added in admin (`Services` page) will appear on website after you switch `src/lib/services.ts` and `src/routes/services.tsx` to fetch via `supabase.from('services').select(...).eq('is_active',true)` instead of hardcoded array. Example already seeded.
