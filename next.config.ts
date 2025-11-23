/** @type {import("next").NextConfig} */
const nextConfig = {
  // force Webpack, disable Turbopack fully
  webpack: (config: any) => {
    return config;
  },
  experimental: {
    turbo: false,
  },
  turbopack: false,
  eslint: {
    ignoreDuringBuilds: true,   // <-- ADD THIS LINE
  },
};

export default nextConfig;







