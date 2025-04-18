const fetchSlugs = async () => {
  const res = await fetch(`https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/entries?access_token=${process.env.CONTENTFUL_ACCESS_TOKEN}`);
  const data = await res.json();

  return data.items.map((item) => {
    const slug = item.fields.slug;
    const contentType = item.sys.contentType.sys.id; // Assuming the content type ID is stored here
    if (!['blogPost', 'technology', 'about','techNames','pageHeader','projects'].includes(contentType)) {

      return {
        loc: `${contentType}/${slug}`,
        lastmod: new Date(item.sys.updatedAt).toISOString(),
      };

    }

  });
};


module.exports = {
  siteUrl: process.env.SITE_URL, // Your website URL
  generateRobotsTxt: true, // Optional: Generate robots.txt file
  additionalPaths: async () => {
    const dynamicPaths = await fetchSlugs();
    return dynamicPaths;
  },
};
