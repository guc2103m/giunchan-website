import type { NextConfig } from 'next';
import { redirects as legacyRoutes } from './lib/site-data';

const nextConfig: NextConfig = {
  async redirects() {
    return Object.entries(legacyRoutes).map(([source,destination])=>({source,destination,permanent:true}));
  },
};

export default nextConfig;
