/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "digicommerce-batch4.s3.ap-southeast-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "fakeimg.pl",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
