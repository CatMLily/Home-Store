module.exports = {
  css: {
    extract: false,
    loaderOptions: {
      less: {
        data: '@import "@/less/common.less";',
      },
    },
  },
};
