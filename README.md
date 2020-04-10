# react-template

> create-react-app 模版,包含webpack自定义配置

## Build Setup

```bash
# enter the project directory
cd react-template

# install dependency
npm install

# develop
npm run dev
```

This will automatically open http://localhost:3000

## webpack自定义配置

> 包含antd按需加载、路径别名、高阶组件装饰器、打包进度条

###  第一步安装插件
```bash
// 安装一下需要的插件
yarn add antd react-app-rewired customize-cra babel-plugin-import less less-loader 

// 进度条插件
yarn add progress-bar-webpack-plugin chalk -D
```

### 第二不修改package.json
```bash
"scripts": {
    - "start": "react-scripts start",
    - "build": "react-scripts build",
    - "test": "react-scripts test",

    + "start": "react-app-rewired start",
    + "build": "react-app-rewired build",
    + "test": "rreact-app-rewired test",
}
```

### 第三步创建config-overrides.js的文件

```bash
const { 
  override,
  fixBabelImports,
  addDecoratorsLegacy, 
  addWebpackAlias, 
  addWebpackPlugin 
} = require('customize-cra');
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
```
