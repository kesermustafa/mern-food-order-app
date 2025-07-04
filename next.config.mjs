/** @type {import('next').NextConfig} */
const nextConfig = {



    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "www.com",
            },
        ],
    },
};

export default nextConfig;
