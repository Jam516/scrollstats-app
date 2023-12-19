/** @type {import('next').NextConfig} */
module.exports = {
    webpack: (config) => {
        config.resolve.fallback = { fs: false, net: false, tls: false };
        return config;
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/users/week',
                permanent: true,
            },
            {
                source: '/bd',
                destination: '/bd/month',
                permanent: true,
            },
        ]
    },
};
