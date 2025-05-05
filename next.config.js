/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    loader: "custom",
    formats: ["image/avif", "image/webp"],
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
