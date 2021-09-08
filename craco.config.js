const CracoLessPlugin = require('craco-less')
const path = require('path')
const resolve = (relatedPath) => path.resolve(__dirname, relatedPath);

const pathResolve = pathUrl => path.join(__dirname, pathUrl)
module.exports = {
  webpack: {
    alias: {
      "@@": pathResolve("."),
      "@": pathResolve("src"),
      "@assets": pathResolve("src/assets"),
      "@images": pathResolve("src/assets/images"),
      "@components": pathResolve("src/components"),
      "@hooks": pathResolve("src/hooks"),
      "@pages": pathResolve("src/pages"),
      "@store": pathResolve("src/store"),
      "@utils": pathResolve("src/utils"),
      // 此处是一个示例，实际可根据各自需求配置
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [resolve("../src")],
        // 一定要加这个 否则检测不到
        enforce: "pre",
        use: [
          {
            loader: "eslint-loader",
            options: {
              // 不符合Eslint规则时只console warning(默认false 直接error)
              // emitWarning: true
              fix: true,
            },
          },
        ],
      },
      {
        test: [/\.jpg/],
        loader: require.resolve("url-loader"),
        options: {
          limit: 10000,
          name: "static/media/[name].[ext]",
        },
      },
    ],
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { "@primary-color": "#1DA57A" },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  // devServer: {
  //   host: '0.0.0.0',
  //   port: '8203', // 指定端口
  //   open: 'http://localhost:8203',
  //   historyApiFallback: true, // 当找不到路径的时候，默认加载index.html文件
  //   hot: true,
  //   contentBase: false, // 告诉服务器从哪里提供内容。只有在想要提供静态文件时才需要
  //   compress: true, // 一切服务都启用gzip 压缩
  //   disableHostCheck: true, // 防止Invalid Host header的报错
  //   overlay: {
  //     errors: true,
  //     warnings: true,
  //   },
  // // 接口请求代理
  // proxy: {
  //   '*': {
  //     target: proxyApi[APP_ENV].url,
  //     secure: false,
  //     changeOrigin: true,
  //   },
  // },
  // },
  // resolve: {
  //   extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  //   alias: {
  //     "@src": resolve("src"),
  //     "@components": resolve("/src/components"),
  //     "@utils": resolve("src/utils"),
  //     "@common": resolve("src/config"),
  //     "@images": resolve("src/assets/images"),
  //   },
  // },
};
