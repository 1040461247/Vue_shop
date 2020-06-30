const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
  chainWebpack: config => {
    // 发布模式配置
    config.when(process.env.NODE_ENV === 'production', config => {
      // 自定义打包入口
      config.entry('app').clear().add('./src/main-prod.js')
      // 在不同打包环境下显示不同标题
      config.plugin('html').tap(args => {
        args[0].isProd = true
        return args
      })
    })
    // 开发模式配置
    config.when(process.env.NODE_ENV === 'development', config => {
      // 自定义打包入口
      config.entry('app').clear().add('./src/main-dev.js')
      // 在不同打包环境下显示不同标题
      config.plugin('html').tap(args => {
        args[0].isProd = false
        return args
      })
    })

    // 设置快捷路径， @ 表示 'src' ，components 表示 'src/components'
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('common', resolve('src/components/common'))
      .set('content', resolve('src/components/content'))
      .set('network', resolve('src/network'))
      .set('views', resolve('src/views'))
  },
  lintOnSave: false
}
