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
const { override, fixBabelImports, addLessLoader, addWebpackAlias, addDecoratorsLegacy } = require('customize-cra');
const path = require('path');
function resolve(dir) {
    return path.join(__dirname, '.', dir)
}

module.exports = override(
    // antd按需加载，不需要每个页面都引入“antd/dist/antd.css”了
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true  //这里一定要写true，css和less都不行
    }),
    // 添加装饰器的能力
    addDecoratorsLegacy(),
    // 配置路径别名
    addWebpackAlias({
      "@": resolve("src")
    }),
    addLessLoader({
      javascriptEnabled: true,
      //下面这行很特殊，这里是更改主题的关键，这里我只更改了主色，当然还可以更改其他的，下面会详细写出。
      modifyVars: { "@primary-color": "#f47983"}
    }),
    addWebpackPlugin(new ProgressBarPlugin({ // 加载进度条
        complete: '█',
        format: `${chalk.green('Building')} [ ${chalk.green(':bar')} ] ':msg:' ${chalk.bold('(:percent)')}`,
        clear: true,
    })),
)

```
