# CLAUDE.md — jabercrombia-app

Project context and conventions for AI coding agents working in this repository.

---

## Project Overview

Personal portfolio site for Justin Abercrombia. Built with Next.js 15 App Router. Content is managed via Contentful (headless CMS). Deployed on Vercel.

**Live sections:** Home (about/experience), Portfolio, Design, Photos, Blog, Web

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| UI Components | shadcn/ui (Radix UI primitives) |
| CMS | Contentful (GraphQL API) |
| Fonts | Inter (body) + Syne (display/headings) via `next/font/google` |
| Icons | Lucide React |
| Analytics | Vercel Analytics + Google Analytics 4 |
| Deployment | Vercel |

---

## Commands

```bash
# Development
npm run dev

# Production build (also generates sitemap)
npm run build

# Start production server
npm run start
```

---

## Project Structure

```
app/                        # Next.js App Router pages
  layout.tsx                # Root layout — Header, Footer, BreadCrumb, Analytics
  page.tsx                  # Home page — hero, experience timeline, skills grid
  globals.css               # Global styles + Tailwind base + CSS custom properties
  portfolio/page.tsx        # Portfolio projects with tech-stack filtering
  design/page.tsx           # Design gallery grid
  design/[slug]/page.tsx    # Individual design project
  photos/page.tsx           # Photo gallery (masonry)
  photos/[slug]/page.tsx    # Individual photo
  blog/page.tsx             # Blog post listing
  blog/[slug]/page.tsx      # Individual blog post
  web/page.tsx              # Web projects (legacy)
  api/                      # API routes (metrics, draft, revalidate, search)

components/
  header.tsx                # Fixed nav — logo + nav links + search
  footer.tsx                # Copyright + email
  logo.tsx                  # SVG logo mark
  search.tsx                # Search bar
  breadcrumb.tsx            # Breadcrumb nav
  aboutme/
    skills.tsx              # 4-column skills grid (client component)
    sections.tsx            # Section wrapper with label + divider line
    certificationList.tsx   # Certification item with blue left border
  ui/                       # shadcn/ui primitives (button, card, sheet, dialog…)
  styles/
    _variables.scss         # SCSS variables
    aboutme.module.scss     # All home page styles (Portfolio.jsx design)
    blog/                   # Blog-specific SCSS modules

lib/
  api.ts                    # All Contentful GraphQL queries
  constants.ts              # Site-wide constants
  utils.ts                  # cn() helper (clsx + tailwind-merge)
  gtag.ts                   # Google Analytics event helper
```

---

## Design System

The site uses the **Portfolio.jsx** design language — dark, editorial, minimal.

### Color Palette

> For neutral grays and surface token reference, see [`ai-agent-ux-design/palettes/neutral.md`](ai-agent-ux-design/palettes/neutral.md).

| Variable | Hex | Usage |
|---|---|---|
| `--bg` | `#080b10` | Page background |
| `--bg2` | `#0e1219` | Card / skill group background |
| `--bg3` | `#141920` | Badge / elevated surface |
| `--border` | `rgba(255,255,255,0.07)` | All borders and dividers |
| `--text` | `#e8eaf0` | Primary text |
| `--text2` | `#7a8099` | Secondary / muted text |
| `--text-subtle` | `#4a5068` | Dimmed text, dates, labels |
| `--accent` | `#4f8ef7` | Blue accent — links, highlights |

### Typography

- **Body:** Inter, `font-weight: 300`, `font-size: 15px`, `line-height: 1.7`
- **Display / Headings:** Syne, `font-weight: 800`, referenced via `var(--font-syne)`
- **Section labels:** `11px`, `letter-spacing: 0.15em`, `text-transform: uppercase`

### Layout

- Content width uses Tailwind `container mx-auto px-6`
- Header is `fixed` — pages offset with `padding-top: 68px` on `.page`
- Responsive breakpoint at `700px` — badges hide, grids collapse to 2-col

---

## Content — Contentful

All content is fetched server-side via GraphQL from Contentful. GraphQL queries live in [`lib/api.ts`](lib/api.ts).

### Collections

| Collection | Key Fields |
|---|---|
| `aboutCollection` | `jobTitle`, `company`, `startDate`, `endDate`, `summary`, `logo` |
| `projectsCollection` | `title`, `slug`, `description`, `url`, `githubUrl`, `technologyNameListCollection`, `photosCollection` |
| `designCollection` | `title`, `slug`, `designGalleryCollection`, `body`, `swatches` |
| `photosCollection` | `title`, `slug`, `photosCollection`, `description` |
| `postCollection` | `title`, `slug`, `date`, `tags`, `content`, `excerpt`, `coverImage` |
| `pageHeaderCollection` | `title`, `body`, `slug`, `heroImage` |

### Required Environment Variables

```bash
CONTENTFUL_SPACE_ID=
CONTENTFUL_ACCESS_TOKEN=
CONTENTFUL_PREVIEW_ACCESS_TOKEN=
GOOGLE_TRACKIND_ID=
SITE_URL=
```

---

## Styling Conventions

- **Tailwind CSS is the primary styling tool** — use it for all layout, spacing, typography, color, flexbox, grid, and responsive utilities
- **shadcn/ui is the primary UI component library** — use its components (Button, Card, Dialog, Sheet, etc.) before building custom ones
- **SCSS Modules are legacy** — do not add new SCSS modules; migrate existing ones to Tailwind when touching a file
- **Inline styles** only as a last resort for values with no Tailwind equivalent (e.g. `backdropFilter`)
- **No light mode** — the site is dark-only; do not add `.dark` class toggles
- Global hover states for nav/footer links live in `globals.css` (`.nav-link`, `.footer-link`)
- Syne font via Tailwind: use `font-[family-name:var(--font-syne)]` or the configured `font-syne` utility class

---

## Component Conventions

- Server Components by default — only add `"use client"` when the component uses hooks, browser APIs, or event handlers
- `cn()` utility from `lib/utils.ts` for conditional Tailwind class merging
- **Prefer shadcn/ui components** (Button, Card, Badge, Dialog, Sheet, etc.) for all interactive and structural UI — do not build custom equivalents when a shadcn component exists
- shadcn/ui components live in `components/ui/` — do not modify generated files directly; extend via `className` props
- Images from Contentful use the `images.ctfassets.net` domain (already in `next.config.js`)

---

## Routing

- `/projects` permanently redirects to `/portfolio` (308)
- Dynamic routes use `[slug]` from Contentful slugs
- Draft mode supported via `/api/draft` and `/api/disable-draft`
- ISR revalidation via `/api/revalidate`

---

## Deployment

Deployed on Vercel. `npm run build` runs `next build && next-sitemap` — the sitemap is generated automatically from `next-sitemap.config.js`. Environment variables must be set in the Vercel dashboard.

---

## SEO

- Every page must export `generateMetadata()` with `title`, `description`, `alternates.canonical`, and `openGraph` fields
- `description` should be 130–160 characters — use `truncateText()` from `lib/truncatetext.ts` when pulling from CMS content
- Canonical URLs use `process.env.NEXT_PUBLIC_SITE_URL` as the base
- Dynamic pages (`[slug]`) must generate metadata from the fetched entry, not hardcoded strings
- Structured data (`application/ld+json`) is used on blog posts (Article), photo galleries (ImageGallery), and photo entries (ImageObject) — maintain this on any new content types
- The sitemap is auto-generated via `next-sitemap` on every build and commits `public/sitemap*.xml` and `public/robots.txt` back to the repo via GitHub Actions (`.github/workflows/sitemap.yml`)
- Images should use Next.js `<Image>` with `sizes` and `priority` on above-the-fold images for LCP performance

---

## Accessibility

See [`ai-agent-ux-design/instructions/accessibility.md`](ai-agent-ux-design/instructions/accessibility.md).
