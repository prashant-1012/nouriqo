import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // Product images are uploaded by the client in the Wix dashboard and
        // served from Wix's media CDN — see docs/WIX_INTEGRATION.md.
        protocol: "https",
        hostname: "static.wixstatic.com",
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;
