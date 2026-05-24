# Justin Abercrombia — Personal Site

![homepage image](/public/homepage/homepage_thumb.png)

Personal portfolio site for Justin Abercrombia. Built with Next.js 15 App Router, content managed via Contentful (portfolio, design, photos) and Sanity (blog posts, experience), and deployed on Vercel.

## Features

- **Next.js 15** App Router with server components
- **Contentful CMS** for portfolio, design, and photo content
- **Sanity CMS** for blog posts and work experience
- **i18n** — locale routing (`/es/`, `/fr/`, `/it/`) with translated nav, page heroes, and metadata
- **hreflang tags** for multilingual SEO
- **Vercel Analytics + Speed Insights** built in
- **Tailwind CSS 4** + shadcn/ui component library
- **SEO** — `generateMetadata`, Open Graph, JSON-LD structured data, auto-generated sitemap

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 + shadcn/ui |
| CMS (content) | Contentful (GraphQL) |
| CMS (blog/experience) | Sanity (GROQ) |
| Fonts | Inter + Syne via `next/font/google` |
| Deployment | Vercel + Cloudflare (DNS / CDN) |

## Getting Started

### Prerequisites

- Node.js LTS
- npm

### Environment Variables

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

```bash
# Contentful
CONTENTFUL_SPACE_ID=
CONTENTFUL_ACCESS_TOKEN=
CONTENTFUL_PREVIEW_ACCESS_TOKEN=

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_TOKEN=

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
SITE_URL=https://www.jabercrombia.com
GOOGLE_TRACKIND_ID=
NEXT_PUBLIC_GA_ID=
```

### Development

```bash
npm install
npm run dev
```

The site runs at `http://localhost:3000`.

### Production build

```bash
npm run build
npm start
```

`npm run build` also generates the sitemap via `next-sitemap`.

## i18n

Locale routing is handled by Next.js rewrites + middleware. English is the default (no prefix).

| URL | Locale |
|---|---|
| `/portfolio` | English |
| `/es/portfolio` | Spanish |
| `/fr/portfolio` | French |
| `/it/portfolio` | Italian |

Translations live in `lib/translations.ts`. The `<html lang={locale}>` attribute is set server-side via the `x-locale` middleware header — it reflects the active locale rather than being hardcoded to `"en"`.

## Sanity Setup

Blog posts and work experience are managed in a separate Sanity Studio repo. See `SANITY_EXPERIENCE_SCHEMA.md` for the experience schema definition.

Required document types:
- `post` — blog posts (`title`, `slug`, `body`, `excerpt`, `tags`, `publishedAt`)
- `experience` — work history (`company`, `jobTitle`, `startDate`, `endDate`, `jobDescription`, `logo`)

## Deployment

Deployed on Vercel. Push to `main` triggers an automatic production deployment. Cloudflare is used for DNS management and CDN/caching in front of the Vercel deployment. The sitemap is regenerated on each build via a GitHub Actions workflow.
