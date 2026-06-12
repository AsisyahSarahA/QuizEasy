// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Compress output
  compress: true,
  
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  
  // Experimental: optimize package imports (tree-shaking lucide)
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

module.exports = nextConfig;