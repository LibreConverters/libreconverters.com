import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/libreconverters.com',
  assetPrefix: '/libreconverters.com',
  trailingSlash: true,
  
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
