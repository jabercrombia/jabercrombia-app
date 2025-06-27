/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ['images.ctfassets.net'],  // add your image host domain here

  },
  async redirects() {
    return [
      {
        source: '/projects',
        destination: '/portfolio',
        permanent: true, // true = 308, false = 307
      },
    ]
  },
};
