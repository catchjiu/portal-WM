# CATCH JIU JITSU Portal

Dark-mode member portal and admin dashboard scaffold for CATCH JIU JITSU, built with Next.js App Router, TypeScript, Tailwind CSS, next-intl, TanStack Query, and Supabase-ready service boundaries.

## Included

- Member dashboard with family switcher, QR card, rank badge, progress, and next booking summary
- Weekly schedule with booking validation and optimistic updates
- Public kiosk screen with live polling plus Supabase Realtime hook points
- Shop, preorder confirmation, pending order creation, and payment review surfaces
- Admin overview, member management, inventory management, and payment review screens
- Supabase schema migrations, seed data, RLS policies, and helper client wrappers

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000/en/dashboard](http://localhost:3000/en/dashboard).

## Quality checks

```bash
npm run lint
npm run test
npm run build
```

## Environment

Copy `.env.example` into your local env file and supply Supabase and LINE credentials when you are ready to replace the in-memory demo data with live integrations.

## Deployment

- Frontend: Vercel
- Container build target: `Dockerfile` for Google Cloud Run
