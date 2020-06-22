module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      // 视窗的宽度,对应的是我们设计稿的宽度
      viewportWidth: 375,
      // 视窗的高度,对应的使我们设计稿的高度
      viewportHeight: 667,
      // 指定'px'转换为视窗单位值的小数位数(很多时候无法整数)
      unitPrecision: 5,
      // 指定需要转换成的视窗单位,建议使用vw
      viewportUnit: 'vw',
      // 指定不需要转换的类,后面再讲
      selectorBlackList: ['ignore', 'tab-bar'],
      // 小于或者等于'1px'不转换为视窗单位
      minPixelValue: 1,
      // 允许在媒体查询中转换px
      mediaQuery: false
    },
  }
}