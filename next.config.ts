import type { NextConfig } from "next";

/**
 * Security Headers Configuration
 *
 * Note: These headers don't apply when using `output: 'export'` (static export).
 * For production, add these headers at your hosting layer:
 * - Vercel: Use vercel.json headers config
 * - Netlify: Use _headers file
 * - Nginx/Apache: Configure in server config
 * - Cloudflare: Use Page Rules or Workers
 *
 * Example _headers file for Netlify:
 * /*
 *   X-Frame-Options: SAMEORIGIN
 *   X-Content-Type-Options: nosniff
 *   X-XSS-Protection: 1; mode=block
 *   Referrer-Policy: strict-origin-when-cross-origin
 */
export const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
];

const nextConfig: NextConfig = {
  // Static HTML export for CDN deployment
  output: 'export',

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },

  // Clean URLs with trailing slashes
  trailingSlash: true,

};

export default nextConfig;
