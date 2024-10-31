/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone", reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `http://sysadmin.myoshopoo.com/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
