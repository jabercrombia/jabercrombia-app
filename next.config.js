/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ['images.ctfassets.net'],
  },
  async redirects() {
    return [
      {
        source: '/projects',
        destination: '/portfolio',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    const locales = ['es', 'fr', 'it'];
    const sections = ['portfolio', 'design', 'photos', 'blog'];
    return [
      ...locales.map((locale) => ({
        source: `/${locale}`,
        destination: '/',
      })),
      ...sections.flatMap((section) =>
        locales.map((locale) => ({
          source: `/${locale}/${section}`,
          destination: `/${section}`,
        }))
      ),
    ];
  },
};
