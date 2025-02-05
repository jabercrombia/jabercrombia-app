const HOMEPAGE_GRAPHQL_FIELDS = `
  sys {
    id
  }
  title
  body
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

function extractHomePageSections(fetchResponse: any) {
  console.log(fetchResponse);
  return fetchResponse?.data;
}

export async function getHomepageSections(

  // By default this function will return published content but will provide an option to
  // return draft content for reviewing homepageSections before they are live
  isDraftMode = false,
) {
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

function extractPostEntries(fetchResponse: any): any[] {
  return fetchResponse?.data;
}

// export async function getPostAndMorePosts(
//   slug: string,
//   preview: boolean,
// ): Promise<any> {
//   const entry = await fetchGraphQL(
//     `query {
//       postCollection(where: { slug: "${slug}" }, preview: ${
//         preview ? "true" : "false"
//       }, limit: 1) {
//         items {
//           ${POST_GRAPHQL_FIELDS}
//         }
//       }
//     }`,
//     preview,
//   );

//   return {
//     post: extractPost(entry),
//     morePosts: extractPostEntries(entries),
//   };
// }
