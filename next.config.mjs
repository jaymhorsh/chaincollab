/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID:
      process.env.NEXT_PUBLIC_PRIVY_ENVIRONMENT_ID,
  },
  images: {
    domains: ["vod-cdn.lp-playback.studio"],
  },
};

export default nextConfig;
