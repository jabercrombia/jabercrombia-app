# Justins Personal Site

![homepage image](/public/homepage/homepage_thumb.png)

This is the repository for my personal website, built with Next.js, powered by Contentful as a headless CMS, and deployed via Vercel.

## Features
- **Next.js** for a fast, modern React-based framework
- **Contentful CMS** for easy content management
- **Vercel** for seamless deployment and hosting
- **SEO Optimized** with meta tags and Open Graph support
- **Responsive Design** to ensure compatibility across devices

## Technologies Used
- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Contentful](https://www.contentful.com/)
- [Vercel](https://vercel.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## Getting Started

### Prerequisites
Ensure you have the following installed:
- Node.js (LTS version recommended)
- npm or yarn

### Environment Variables
Create a `.env.local` file in the root directory and add the following variables:
```
NEXT_PUBLIC_CONTENTFUL_SPACE_ID=your_space_id
NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=your_access_token
```
Replace `your_space_id` and `your_access_token` with your actual Contentful credentials.

### Running the Development Server
Start the local development server with:
```sh
npm run dev
# or
yarn dev
```
The website will be available at `http://localhost:3000/`.

### Building for Production
To build and test the production version locally:
```sh
npm run build
npm start
# or
yarn build
yarn start
```

## Deployment
The site is automatically deployed to Vercel on each push to the `main` branch. To deploy manually:
```sh
vercel
```

## Contributing
Feel free to fork this repository and submit pull requests for improvements or feature additions.

## License
This project is licensed under the MIT License.

