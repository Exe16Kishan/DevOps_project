/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    domains: ["fakestoreapi.com","dummyjson.com"],
  },
   typescript: {
    ignoreBuildErrors: true, // ✅ ignore TS errors
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ ignore lint errors
  },
};

export default nextConfig;
