/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Enables static export
  trailingSlash: true,
  reactStrictMode: false,
  images: {
    unoptimized: true,
    domains: ["assets.aceternity.com","cdn.rareblocks.xyz","gearnride.in"],
  },
};

export default nextConfig;
