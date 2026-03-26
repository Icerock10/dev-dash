import { type NextConfig } from 'next';
import '~/shared/libs/modules/config/config';

const nextConfig: NextConfig = {
    output: 'standalone',
    turbopack: {
        rules: {
            '*.svg': {
                loaders: ['@svgr/webpack'],
                as: '*.js',
            },
        },
    },
};

export default nextConfig;
