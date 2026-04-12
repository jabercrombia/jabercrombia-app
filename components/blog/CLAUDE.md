# CLAUDE.md — Blog Components

Context and conventions for the blog section of jabercrombia-app.

---

## Structured Data — Google BlogPosting Schema

Every individual blog post (`app/blog/[slug]/page.tsx`) must include a `<script type="application/ld+json">` block using the **BlogPosting** schema type. This is Google's preferred type for blog content and unlocks rich results in Search.

### Required Schema Shape

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Post title (max 110 characters)",
  "description": "Post excerpt or truncated summary",
  "image": "https://absolute-url-to-cover-image.jpg",
  "datePublished": "2024-01-15T00:00:00Z",
  "dateModified": "2024-01-20T00:00:00Z",
  "author": {
    "@type": "Person",
    "name": "Justin Abercrombia",
    "url": "https://jabercrombia.com"
  },
  "publisher": {
    "@type": "Organization",
    "name": "jabercrombia",
    "logo": {
      "@type": "ImageObject",
      "url": "https://jabercrombia.com/favicon.png"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://jabercrombia.com/blog/[slug]"
  }
}
```

### Field Rules

| Field | Rule |
|---|---|
| `@type` | Always `"BlogPosting"` — not `"Article"` |
| `headline` | Use `post.title`; must be under 110 characters |
| `description` | Use truncated excerpt — pull via `truncateRichText()` or `post.excerpt` |
| `image` | Must be an absolute URL; use `post.coverImage?.url` |
| `datePublished` | ISO 8601 — use `post.date` or `post.sys.firstPublishedAt` |
| `dateModified` | ISO 8601 — use `post.updatedAt` falling back to `post.date` |
| `author.url` | Always `${process.env.NEXT_PUBLIC_SITE_URL}` |
| `publisher.logo.url` | Always `${process.env.NEXT_PUBLIC_SITE_URL}/favicon.png` |
| `mainEntityOfPage["@id"]` | Always `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}` |

### Implementation

Inject the schema inside the `<article>` element as the first child:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
/>
```

Build `schemaData` as a plain object before the `return` in the render function — do not inline the object inside `dangerouslySetInnerHTML`.

### Validation

After changes, verify with [Google's Rich Results Test](https://search.google.com/test/rich-results) using the live post URL or by pasting the raw JSON-LD.

---

## Color Conventions

Follow the project-wide rule: **no hardcoded hex values**. Use CSS variables from `app/globals.css`.

| Use case | Variable |
|---|---|
| Body / prose text | `var(--primary-color)` |
| Dates, labels, dimmed text | `var(--text3)` |
| Headings | `var(--text)` |
| Links / accent | `var(--accent)` |
| Borders / dividers | `var(--border)` |
