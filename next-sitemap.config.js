const fetchSlugs = async () => {
  const res = await fetch(`https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/entries?access_token=${process.env.CONTENTFUL_ACCESS_TOKEN}`);
  const data = await res.json();

  return data.items.map((item) => {
    const slug = item.fields.slug;
    const contentType = item.sys.contentType.sys.id; // Assuming the content type ID is stored here
    if (
      slug && 
      !['blogPost', 'technology', 'about', 'techNames', 'pageHeader', 'projects'].includes(contentType)
    ) {

      return {
        loc: `${contentType}/${slug}`,
        lastmod: new Date(item.sys.updatedAt).toISOString(),
      };

    }

  });
};

const additionalPages = [
  {
    'loc': '/',
    'lastmod': new Date().toISOString()
  },
  {
    'loc': '/portfolio',
    'lastmod': new Date().toISOString()
  },
  {
    'loc': '/photos',
    'lastmod': new Date().toISOString()
  },
  {
    'loc': '/design',
    'lastmod': new Date().toISOString()
  },
  {
    'loc': '/blog',
    'lastmod': new Date().toISOString()
  },
];


module.exports = {
  siteUrl: process.env.SITE_URL,
  generateRobotsTxt: true,
  additionalPaths: async () => {
    const dynamicPaths = await fetchSlugs();
    console.log(dynamicPaths.concat(additionalPages));
    return dynamicPaths.concat(additionalPages);
  },
};
