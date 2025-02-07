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
      url (transform:{resizeFocus:CENTER, resizeStrategy: FILL, width:600, height: 600})
    }
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
                url (transform:{resizeFocus:CENTER, resizeStrategy: FILL, width:600, height: 400})
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
  console.log(fetchResponse.data);
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

//Individual Design Page
function extractDesignCollectionEntries(fetchResponse: any): any {
  return fetchResponse?.data;
}

export async function getDesignCollectionEntry( slug: string) {
  const photoGraphQL = await fetchGraphQL(
    `query {
        designCollection (where: {slug: "${slug}"}) {
          items {
            title
            body
            swatches
            designGalleryCollection {
              items {
                title
                url (transform:{resizeFocus:CENTER, resizeStrategy: FILL, width:600, height: 600})
                width
                height
              }
            }
          }
        }
      }`,
  );
  return extractDesignCollectionEntries(photoGraphQL);
}

//Page Header
function extractPageHeaderEntries(fetchResponse: any): any {
  return fetchResponse?.data;
}

export async function getPageHeaderCollection( title: string) {
  const photoGraphQL = await fetchGraphQL(
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
  return extractPageHeaderEntries(photoGraphQL);
}