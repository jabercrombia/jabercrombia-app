const HOMEPAGE_GRAPHQL_FIELDS = `
  title
  body
  heroImage {
    title
    url (transform:{resizeFocus:CENTER, resizeStrategy: FILL, width:600, height: 400})
    width
    height
  }
`;

const WEB_GRAPHQL_FIELDS = `
  title
  body
  slug
  heroImage {
    title
    url (transform:{resizeFocus:CENTER, resizeStrategy: FILL, width:600, height: 400})
    width
    height
  }
`;

async function fetchGraphQL(query: string, preview = false): Promise<any> {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
    },
  ).then((response) => response.json());
}

function extractHomePageSections(fetchResponse: any): any {
  return fetchResponse?.data;
}

export async function getHomepageSections() {
  const homepageSections = await fetchGraphQL(
    `query {
        pageHeaderCollection(where: {
        AND: [
          { title_not: "justin abercrombia" },
          {title_not: "home"}
        ]
  }) {
          items {
            ${HOMEPAGE_GRAPHQL_FIELDS}
          }
        }
      }`,
  );
  return extractHomePageSections(homepageSections);
}

function extractWebCollectionSection(fetchResponse: any) {
  return fetchResponse?.data;
}

// Web Page GraphQL
export async function getWebCollection() {
  const webCollectionSection = await fetchGraphQL(
    `query {
        webCollection {
          items {
            ${WEB_GRAPHQL_FIELDS}
          }
        }
      }`,
  );
  return extractWebCollectionSection(webCollectionSection);
}

function extractWebCollectionEntries(fetchResponse: any): any {
  return fetchResponse?.data;
}

// Individual Web Page GraphQL
export async function getWebCollectionEntry( slug: string) {
  const webCollectionEntry = await fetchGraphQL(
    `query {
        webCollection (where: {slug: "${slug}"}) {
          items {
            title
            body
            slug
            heroImage {
              url
            }
            link
            imageGalleryCollection {
              items {
                url (transform:{resizeFocus:CENTER, resizeStrategy: FILL, width:600, height: 400})
                title
              }
            }
            technologyCollection (limit: 5) {
              items {
                technologyName
                fontawesomeName
                fontawesomeTypes
              }
            }
          }
        }
      }`,
  );
  return extractWebCollectionEntries(webCollectionEntry);
}
