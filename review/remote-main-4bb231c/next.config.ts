import type { NextConfig } from 'next';
import { redirects as legacyRoutes } from './lib/site-data';

const nextConfig: NextConfig = {
  distDir: process.env.NEXT_DIST_DIR || '.next',
  async redirects() {
    return Object.entries(legacyRoutes).map(([source,destination])=>({source,destination,permanent:true}));
  },
};

export default nextConfig;
