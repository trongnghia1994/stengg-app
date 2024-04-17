const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    'antd',
    'rc-util',
    '@babel/runtime',
    '@ant-design/icons',
    '@ant-design/icons-svg',
    'rc-pagination',
    'rc-picker',
    'rc-tree',
    'rc-table',
  ],
  env: {
    API_HOST: process.env.NEXT_PUBLIC_API_HOST,
  },
};

export default nextConfig;
