# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build (outputs to /out for static export)
npm run start    # Serve production build locally
```

There is no test suite. ESLint is configured but no `lint` script is defined — run it directly with `npx next lint`.

## Environment Setup

Create `.env.local` with Supabase credentials before running locally:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_KEY=...
```

The app will build but Supabase calls will fail at runtime without these.

## Architecture

This is a **Next.js 15 Pages Router** app (not App Router). The single page at [src/pages/index.tsx](src/pages/index.tsx) composes all sections in order.

**Guest access control** is the entry point: the page reads `?guest=<uuid>` from the URL, looks up the guest in Supabase (`guests` table), and blocks rendering if the guest is not found. Legacy links use `?to=<name>` (name only, no DB lookup).

**Customization lives entirely in two config files:**
- [src/config/wedding-config.ts](src/config/wedding-config.ts) — all wedding content: couple info, event details, gallery, RSVP, digital envelope, music, and feature flags (`specialFeatures.giftRegistry.enabled`, `specialFeatures.liveStreaming.enabled`)
- [src/config/theme-config.ts](src/config/theme-config.ts) — color themes; change `activeTheme` to switch the default

**Theme system:** `ThemeContext` ([src/contexts/ThemeContext.tsx](src/contexts/ThemeContext.tsx)) wraps the app and exposes `useTheme()`. Most sections import `activeTheme` from `theme-config.ts` directly (static) rather than using the context (dynamic).

**Supabase tables used:**
- `guests` — stores name, access_count, accessed_at, rsvp_submitted_at, rsvp_wishes; keyed by UUID passed in the URL
- RSVP submission writes back to the same `guests` row

**Sections** in [src/components/sections/](src/components/sections/) are self-contained. Optional sections (`LiveStreaming`, `GiftRegistry`) check their `enabled` flag from `weddingConfig` and render nothing when disabled.

**Animations:** AOS (initialized once in index.tsx) for scroll-triggered entry; Framer Motion for component-level transitions. Shared scroll animation presets are in [src/components/animations/scrollAnimations.ts](src/components/animations/scrollAnimations.ts).

## Deployment

Push to `main` triggers GitHub Actions ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)), which builds and deploys to the `gh-pages` branch via `JamesIves/github-pages-deploy-action`. Requires `SUPABASE_URL` and `SUPABASE_KEY` repository secrets.
