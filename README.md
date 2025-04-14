# Justins Personal Site

![homepage image](/public/homepage/homepage_thumb.png)

This is the repository for my personal website, built with Next.js, powered by Contentful as a headless CMS, and deployed via Vercel.

## Features
- **Next.js** for a fast, modern React-based framework
- **Contentful CMS** for easy content management
- **Vercel** for seamless deployment and hosting
- **SEO Optimized** with meta tags and Open Graph support
- **Responsive Design** to ensure compatibility across devices 
- **Cypress Testing** for end-to-end testing to ensure site functionality
- **Search Component** using GraphQL to dynamically filter and search through projects and technologies

## Technologies Used
- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Contentful](https://www.contentful.com/)
- [Vercel](https://vercel.com/)
- [Shadcn](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Cypress](https://www.cypress.io/) for end-to-end testing
- **GraphQL** for querying data from Contentful and powering the search functionality

## Search Component

The site includes a **search component** that allows users to search for projects and technologies. This feature is powered by a GraphQL query that dynamically filters Contentful data.

### Key Features:
- **Dynamic Search**: Uses GraphQL to filter projects based on title and technology names.
- **Technology Filtering**: The search allows filtering based on technologies used in the projects. Users can select checkboxes for each technology (e.g., "NextJS", "Tailwind") to filter results.
  
### How it Works:
The search component queries the Contentful CMS for the list of projects and their associated technologies. It uses the GraphQL `projectsCollection` query, which includes the filtering capability to narrow down results based on the selected technologies and project titles.

Example of GraphQL query used in the search:
```graphql
query SearchProjects($keyword: String, $tech: String) {
  projectsCollection(where: {
    OR: [
      { title_contains: $keyword },
      { technologyNameListCollection_some: { name_contains: $tech } }
    ]
  }) {
    items {
      title
      description
      technologyNameListCollection {
        items {
          name
        }
      }
    }
  }
}
