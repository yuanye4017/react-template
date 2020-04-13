process.env.PORT = 8080
process.env.GENERATE_SOURCEMAP !== 'false'

const { 
  override, 
  fixBabelImports,
  addLessLoader,
  addPostcssPlugins,
  addDecoratorsLegacy, 
  addWebpackAlias, 
  addWebpackPlugin,
  setWebpackOptimizationSplitChunks
} = require('customize-cra')
// 路径别名
const path = require('path')
const resolve = dir => path.join(__dirname, dir)
// 构建
const chalk = require('chalk')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
// 热更新
const rewireReactHotLoader = require('react-app-rewire-hot-loader')
const hotLoader = () => (config, env) => {
  config = rewireReactHotLoader(config, env)
  return config
}
// 跨域设置
const proxyApi = {
  '/api': {
    // target: '', // prod
    changeOrigin: true,
    secure: false,
    xfwd: false,
    pathRewrite: {
      '^/api': '/'
    }
  },
  '/store': {
    // target: '', // staging
    changeOrigin: true,
    secure: false,
    xfwd: false,
    pathRewrite: {
      '^/store': '/'
    }
  }
}

// 生产环境是否打包 Source Map 两种方法
const rewiredMap = () => config => {
  config.devtool = config.mode === 'development' ? 'cheap-module-source-map' : false

  return config
} 
//生产环境去除console.* functions
const dropConsole = () => {
  return config => {
    if (config.optimization.minimizer) {
      config.optimization.minimizer.forEach(minimizer => {
        if (minimizer.constructor.name === 'TerserPlugin') {
          minimizer.options.terserOptions.compress.drop_console = true
        }
      })
    }
    return config
  }
}

module.exports = {
  webpack: override(
    fixBabelImports('import', {
      libraryName: 'antd-mobile',
      style: 'css',
    }),
    addLessLoader(), // 增加less支持
    addDecoratorsLegacy(), // 添加装饰器的能力
    rewiredMap(), // 关闭mapSource
    hotLoader(), // 热更新
    dropConsole(),
    addWebpackAlias({ // 配置路径别名
      '@': resolve('src')
    }),
    addPostcssPlugins([
      require('autoprefixer'),
      require('postcss-pxtorem')({
        rootValue: 37.5, 
        propList: ['*'], 
        minPixelValue: 2, 
        selectorBlackList: ['am-'] 
      })
    ]),
    addWebpackPlugin(
      new ProgressBarPlugin({ // 加载进度条
        complete: '█',
        format: `${chalk.green('Building')} [ ${chalk.green(':bar')} ] ':msg:' ${chalk.bold('(:percent)')}`,
        clear: true
      })
    ),
    setWebpackOptimizationSplitChunks({
      chunks: 'all',
      cacheGroups: {
        libs: { // 只打包初始时依赖的第三方 name ：打包后的文件名  test：规则
          name: 'chunk-libs',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial' // only package third parties that are initially dependent
        },
        antd: { // 单独将 antd 拆包
          name: 'chunk-antd-mobile', 
          priority: 20, 
          test: /[\\/]node_modules[\\/]_?antd-mobile(.*)/ 
        },
        lodash: { // 单独将 lodash 拆包
          name: 'chunk-lodash', 
          priority: 20, 
          test: /[\\/]node_modules[\\/]_?lodash(.*)/ 
        },
        commons: {
          name: 'chunk-commons',
          test: resolve('src/components'), // can customize your rules
          minChunks: 3, //  minimum common number
          priority: 5,
          reuseExistingChunk: true
        }
      }
    })
  ),
  devServer: configFunction => (proxy, allowedHost) => {
    proxy = process.env.NODE_ENV === 'development' ? proxyApi : null
    // allowedHost： 添加额外的地址
    const config = configFunction(proxy, allowedHost)
    return config
  }
}