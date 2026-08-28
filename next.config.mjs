/** @type {import('next').NextConfig} */
const nextConfig = {
  // this project has its own lockfile; pin tracing to it
  outputFileTracingRoot: import.meta.dirname,
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
  },
};

export default nextConfig;
