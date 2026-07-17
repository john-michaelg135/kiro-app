---
inclusion: always
---

# Stack & Conventions

## Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Database & Auth:** Supabase (hosted) with Row Level Security enabled by default
- **Styling:** Tailwind CSS 4
- **Language:** TypeScript (strict mode)
- **Runtime:** React 19

## Design Principles
- Mobile-first responsive design
- Polished, high-quality UI — use design-taste-frontend and high-end-visual-design skills
- Follow current Next.js App Router conventions (check `node_modules/next/dist/docs/` for latest patterns)
- Use Context7 to verify library APIs and conventions before implementing

## Data & Security
- RLS (Row Level Security) is ON by default for all Supabase tables
- Always create RLS policies when adding new tables
- Use Supabase SSR auth helpers for server-side authentication
- Environment variables go in `.env.local` (never commit secrets)

## Code Style
- Use Server Components by default; add `"use client"` only when needed
- Colocate data fetching in Server Components
- Use `loading.tsx` and `error.tsx` for route-level states
- Prefer named exports for components
- Keep components small and composable
