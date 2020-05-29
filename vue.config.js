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
  }
  // ,publicPath: './' // <----这里就是会修改webpack的outPath.publicPath
}
