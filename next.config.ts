const isProd = process.env.NODE_ENV === 'production';

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: isProd ? '/libreconverters.com' : '',
  assetPrefix: isProd ? '/libreconverters.com' : '',
  trailingSlash: true,

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
