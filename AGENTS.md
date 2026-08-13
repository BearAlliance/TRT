# AGENTS.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Next site at http://localhost:3000 and the local CMS API at http://localhost:4000
- `npm run site:dev` / `npm run cms:dev` — start only the static site or CMS API; the CMS loads `.env.local` through `tsx --env-file`
- `npm run cms:hash-password -- "<password>"` — generate the `CMS_PASSWORD_HASH` value for local or Render configuration
- `npm run build` — static export build (output goes to `build/`, not `.next/` — see `distDir` in `next.config.js`)
- `npm start` — serve the production build
- `npm run lint` — ESLint (flat config, `eslint-config-next`)
- `npm run prettier:check` / `npm run prettier:write` — Prettier (Tailwind class sorting via `prettier-plugin-tailwindcss`)
- `npm run test:unit` — Jest (ts-jest) unit tests only
- `npm test` — full gate: lint + prettier:check + test:unit (this is what CI runs)
- Single test: `npx jest src/app/contact/hours.test.ts` or `npx jest -t "<test name>"`
- Husky + lint-staged run ESLint/Prettier on staged files at commit time.

## Architecture

- **Fully static export.** `next.config.js` sets `output: 'export'` and `images: { unoptimized: true }`. There are no API routes, no middleware, no SSR/ISR — every page is prerendered at build time. Don't add `app/api/*` routes or server actions; they won't work in this export mode.
- **Inventory CMS is a separate Fastify service.** `src/cms/server.ts` owns app bootstrap, SQLite initialization/migrations, plugins, and error handling. `routes.ts` declares HTTP routes and auth guards; `handlers.ts` implements auth, inventory CRUD/order, image uploads, and media delivery. Keep API behavior out of the static Next app.
- **Disk-backed data.** The CMS stores `inventory.sqlite` and normalized WebP uploads under `DATA_DIR` (`.data/` locally, `/var/data` on Render). It has one shared admin account configured through `CMS_USERNAME`, `CMS_PASSWORD_HASH`, and `CMS_SESSION_SECRET`; do not commit `.env.local` or its secrets.
- **Inventory frontend.** `src/app/inventory/InventoryGrid.tsx` reads the public CMS API client-side. The unlinked `src/app/admin/` route manages inventory with authenticated API requests. Its base URL is `NEXT_PUBLIC_CMS_API_URL`, which is intentionally public and set during the static-site build.
- **Render deployment.** `render.yaml` defines the static website plus a paid, single-instance CMS web service with a 1 GB persistent disk. The CMS uses `cms.trtbicycles.com` with secure same-site cookies; disk-backed services cannot scale horizontally and have brief deploy downtime.
- **Route-colocated components.** Each `src/app/<route>/` folder contains its own `page.tsx` plus section components used only by that route (e.g. `rental/Pricing.tsx`, `repair/Rates.tsx`, `contact/HoursSection.tsx`). There's no `lib/`, `utils/`, or `hooks/` directory — small helpers live next to the page that uses them (e.g. `app/contact/hours.ts` + its `hours.test.ts`).
- **`src/components/`** holds cross-route shared components (`Container`, `Button`, `Hero`, `Footer`, etc.) — flat, no atomic/design-system layering. `src/components/header/` is the only grouped subfolder (nav bar + nav link data in `links.ts`).
- **`src/app/seo.ts` is the single source of truth for site metadata/business info** — `SITE_URL`, `BUSINESS` address/phone/socials, `SITE_ROUTES`, and the `localBusinessJsonLd` schema.org object. It feeds `layout.tsx` (JSON-LD + default `Metadata`), `robots.ts`, and `sitemap.ts`. When adding a new route, add it to `SITE_ROUTES` or it won't appear in the sitemap (currently true of `/inventory`).
- **Styling is Tailwind v4, CSS-first** — there's no `tailwind.config.js`; theme, plugins (`@tailwindcss/forms`, `@headlessui/tailwindcss`), and custom `@font-face`/animations are declared directly in `src/styles/tailwind.css` via `@theme`/`@plugin`. Class ordering is auto-sorted by `prettier-plugin-tailwindcss`.
- **Path alias:** `@/*` → `src/*`.
- Third-party integrations are client-side script embeds (`next/script`) rather than server-side API calls.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
