/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    domains: ["assets.aceternity.com","cdn.rareblocks.xyz","gearnride.in"],
  },
};

export default nextConfig;
