
  

export const SEARCH_CONTENT_QUERY = `

fragment TransformedImage on Asset {
    url(transform: {resizeFocus: CENTER, resizeStrategy: FILL, width: 120, height: 120, quality: 80})
  }
  query SearchContent($keyword: String!) {
    design: designCollection(where: { title_contains: $keyword }, limit: 10) {
      items {
        sys {
          id
        }
        title
        slug
        description: body
        images: designGalleryCollection{
          items {
            ...TransformedImage
          }
        }
      }
    }
    projects: projectsCollection(where: {
      OR: [
        { title_contains: $keyword },
        { technologyNameList: { name_contains: $keyword } }
      ]
    }, limit: 5) {
      items {
        sys {
          id
        }
        images: photosCollection{
          items {
            ...TransformedImage
          }
        }
        title
        slug
        description

      }
    }
    web: webCollection(where: { title_contains: $keyword }, limit: 5) {
      items {
        sys {
          id
        }
        title
        slug
        description: body
		images: imageGalleryCollection {
          items {
            ...TransformedImage
          }
        }
      }
    }
  }
`;
