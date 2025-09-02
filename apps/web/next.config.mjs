import createNextIntlPlugin from 'next-intl/plugin';

// Point to the i18n request config
const withNextIntl = createNextIntlPlugin({
  requestConfig: './i18n/request.ts'
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true
  }
};

export default withNextIntl(nextConfig);
