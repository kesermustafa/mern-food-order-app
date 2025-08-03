/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "www.com",
            },
        ],
    },
    rewrites() {
        return [
            {
                source: '/api/:path*',
                has: [
                    {
                        type: 'header',
                        key: 'x-forwarded-host',
                        value: 'localhost:5000',
                    },
                ],
                destination: 'http://localhost:5001/api/:path*',
            },
        ];
    },
};

export default nextConfig;
