const proxy = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/api",
    proxy.createProxyMiddleware({
      target: "http://101.34.137.147/api.php/",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
    })
  );
};
