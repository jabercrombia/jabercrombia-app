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

const PHOTOS_GRAPHQL_FIELDS = `
  title
  description
  slug
  photosCollection (limit:1) {
    items {
      title
      url (transform:{resizeFocus:CENTER, resizeStrategy: FILL, width:600, height: 400})
    }
  }
`;

const DESIGN_GRAPHQL_FIELDS = `
  title
  slug
  designGalleryCollection (limit:1) {
    items {
      title
      thumbnail: url (transform:{resizeFocus:CENTER, resizeStrategy: FILL, width:350, height: 350, quality:30})
      url
    }
  }
`;

async function fetchGraphQL(query: string, variables?: Record<string, any>, preview = false): Promise<any> {
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
      body: JSON.stringify({ query, variables }),
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
          {title_not: "home"},
          {title_not: "life"}
        ]
  },order:title_DESC) {
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
                thumbnail: url(transform:{resizeFocus:CENTER, resizeStrategy: FILL, width:300, height: 200, quality: 30})
                url
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

// Photo Page GraphQL
function extractPhotosCollectionSection(fetchResponse: any) {
  return fetchResponse?.data;
}

export async function getPhotosCollection() {
  const collection = await fetchGraphQL(
    `query {
        photosCollection {
          items {
            ${PHOTOS_GRAPHQL_FIELDS}
          }
        }
      }`,
  );
  return extractPhotosCollectionSection(collection);
}

// About Page GraphQL
function extractAboutSection(fetchResponse: any) {
  return fetchResponse?.data;
}

export async function getAboutCollection() {
  const collection = await fetchGraphQL(
    `query {
        aboutCollection(order: startDate_DESC) {
          items {
            jobTitle
            startDate
            endDate
            company
            jobDescription
            logo {
              title
              description
              contentType
              fileName
              size
              url (transform:{resizeStrategy: SCALE, height: 100, quality:100})
              width
              height
            }
          }
        }
      }`,
  );
  return extractAboutSection(collection);
}

//Individual Photo Page
function extractPhotoCollectionEntries(fetchResponse: any): any {
  return fetchResponse?.data;
}

export async function getPhotoCollectionEntry( slug: string) {
  const photoGraphQL = await fetchGraphQL(
    `query {
        photosCollection (where: {slug: "${slug}"}) {
          items {
            title
            description
            slug
            photosCollection {
              items {
                title
                thumbnail: url (transform:{resizeFocus:CENTER, resizeStrategy: FILL, width:350, height: 250, quality:30})
                url
              }
            }
          }
        }
      }`,
  );
  return extractPhotoCollectionEntries(photoGraphQL);
}

// Design Page GraphQL
function extractDesignCollectionSection(fetchResponse: any) {
  return fetchResponse?.data;
}

export async function getDesignCollection() {
  const collection = await fetchGraphQL(
    `query {
        designCollection {
          items {
            ${DESIGN_GRAPHQL_FIELDS}
          }
        }
      }`,
  );
  return extractDesignCollectionSection(collection);
}

// Project Page GraphQL
function extractProjectCollectionSection(fetchResponse: any) {
  return fetchResponse?.data;
}

export async function getProjectCollection(limit?: number) {
 
  const collection = await fetchGraphQL(
    `query GetProjects($limit: Int) {
          projectsCollection(order: order_ASC, limit: $limit) {
          items {
            description
            title
            slug
            url
            githubUrl
            technologyNameListCollection (limit:7) {
              items {
                name
                techStackIconName
              }
            }
            photosCollection {
              items {
                url
                about: url(transform:{resizeFocus:CENTER, resizeStrategy: FILL, width: 400, height: 300, quality: 100})
                thumbnail: url (transform:{resizeFocus:CENTER, resizeStrategy: FILL, width:500, height: 350, quality:30})
                dialog: url (transform:{resizeFocus:CENTER, resizeStrategy: SCALE, width: 800})
              }
            }
          }
        } 
      }`,
      { limit }
  );
  return extractProjectCollectionSection(collection);
}

//Individual Design Page
function extractDesignCollectionEntries(fetchResponse: any): any {
  return fetchResponse?.data;
}

export async function getDesignCollectionEntry( slug: string) {
  const designGraphQL = await fetchGraphQL(
    `query {
        designCollection (where: {slug: "${slug}"}) {
          items {
            title
            body
            swatches
            designGalleryCollection {
              items {
                title
                thumbnail: url (transform:{resizeFocus:CENTER, resizeStrategy: FILL, width:450, height: 450, quality:50})
                url
                width
                height
              }
            }
          }
        }
      }`,
  );
  return extractDesignCollectionEntries(designGraphQL);
}

//Page Header
function extractPageHeaderEntries(fetchResponse: any): any {
  return fetchResponse?.data;
}

export async function getPageHeaderCollection( title: string) {
  const pageHeaderQL = await fetchGraphQL(
    `query {
        pageHeaderCollection (where:{title : "${title}"}) {
          items {
            title
            body
            heroImage {
              url (transform:{resizeFocus:CENTER, resizeStrategy: FILL, width:2000, height: 300})
            }
          }
        }
      }`,
  );
  return extractPageHeaderEntries(pageHeaderQL);
}