const { override, fixBabelImports,addDecoratorsLegacy, addWebpackAlias, addWebpackPlugin } = require('customize-cra');
const path = require('path');
const chalk = require('chalk')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

const resolve = dir => path.join(__dirname, dir);

module.exports = override(
  fixBabelImports('import', { // antd 按需加载 
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addDecoratorsLegacy(), // 添加装饰器的能力
  addWebpackAlias({  // 配置路径别名
    '@': resolve('src'),
  }),
  addWebpackPlugin(new ProgressBarPlugin({ // 加载进度条
    complete: '█',
    format: `${chalk.green('Building')} [ ${chalk.green(':bar')} ] ':msg:' ${chalk.bold('(:percent)')}`,
    clear: true,
  })),
  config => {  // 关闭生产环境下打包生成map文件
    if (process.env.NODE_ENV === 'production') {
      config.devtool = false;
    }
    return config;
  },
);