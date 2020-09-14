module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        // 别名
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views'
      }
    }
  },
  devServer: {
    proxy : {
      '/api': {
        target :'你的接口地址xxx.xxx.xxx.xxx:8080',
        changeOrigin : true,
        pathRewrite: {
          /* 重写路径，当我们在浏览器中看到请求的地址为：http://localhost:8080/api/core/getData/userInfo 时
            实际上访问的地址是：http://121.121.67.254:8185/core/getData/userInfo,因为重写了 /api
           */
          '^/api': ''
        }
      }
    }
  }
  // ,publicPath: './' // <----这里就是会修改webpack的outPath.publicPath
}
