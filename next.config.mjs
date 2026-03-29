/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // Enable static exports for Cloudflare Pages
  images: {
    unoptimized: true, // Required for static export
  },
  transpilePackages: ['pdfjs-dist'],
};

export default nextConfig;
