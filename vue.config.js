// 引入path工具包
const path = require('path')

// __dirname代表当前文件的绝对路径
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '',
  // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: false,
  chainWebpack: config => config.resolve.alias.set('@', resolve('src')),
  // 这里写你调用接口的基础路径，来解决跨域。如果设置了代理，那你本地开发环境的axios的baseURL要写为''，即空字符串
  devServer: {
    host: 'localhost',
    port: 8080
  },
  // 设为false打包时不生成.map文件
  productionSourceMap: false
}
