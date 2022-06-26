const { defineConfig } = require('@vue/cli-service')
// const path = require('path')
// const themePath = path.join(__dirname, './src/styles/vanttheme.less')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false

})

module.exports = {
  publicPath: './',
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 第一种：直接覆盖变量
            'nav-bar-background-color': 'rgb(234, 42, 29)',
            'nav-bar-title-text-color': 'white'
            // 第二种(推荐)：或者可以通过 less 文件覆盖（文件路径为绝对路径）
            // hack: `true; @import "${themePath}";`
          }
        }
      }
    }
  }
}
