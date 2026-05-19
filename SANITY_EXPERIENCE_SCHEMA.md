# Sanity Experience Schema

Add this schema to the Sanity Studio to support the experience/work history section on the home page.

---

## 1. Create the schema file

Create `schemaTypes/experience.ts`:

```ts
export default {
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    {
      name: 'company',
      title: 'Company',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'jobTitle',
      title: 'Job Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      options: { dateFormat: 'YYYY-MM-DD' },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      options: { dateFormat: 'YYYY-MM-DD' },
      description: 'Leave blank if this is your current role.',
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 4,
    },
    {
      name: 'jobDescription',
      title: 'Job Description',
      type: 'text',
      rows: 6,
      description: 'Supports markdown. Displayed on the home page. Falls back to Summary if blank.',
    },
    {
      name: 'logo',
      title: 'Company Logo',
      type: 'image',
      options: { hotspot: false },
      description: 'Upload a dark or black logo — the site renders it white via CSS invert.',
    },
  ],
  orderings: [
    {
      title: 'Start Date, Newest First',
      name: 'startDateDesc',
      by: [{ field: 'startDate', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'company',
      subtitle: 'jobTitle',
      media: 'logo',
    },
  },
}
```

---

## 2. Register the schema

In `schemaTypes/index.ts`, import and add the new type:

```ts
import experience from './experience'

export const schemaTypes = [
  // ...existing types
  experience,
]
```

---

## 3. Field reference

| Field | Type | Required | Notes |
|---|---|---|---|
| `company` | string | yes | Displayed as the role heading |
| `jobTitle` | string | yes | Displayed below company name |
| `startDate` | date | yes | Format `YYYY-MM-DD` |
| `endDate` | date | no | Leave blank for current role |
| `summary` | text | no | Fallback if jobDescription is blank |
| `jobDescription` | text | no | Markdown supported |
| `logo` | image | no | Dark/black logo — inverted to white in UI |

---

## 4. After adding the schema

1. Restart the Sanity Studio dev server
2. Create experience entries in the Studio under **Experience**
3. Order them newest-first using the **Start Date, Newest First** sort preset
