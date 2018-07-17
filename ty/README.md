# 通用项目 webpack 开发环境

## 当前配置命令
* 打包： npm run bulid  
* 本地发开模式： npm run dev 

---


## 当前环境依赖


### css （可在js内引入css文件，import './style.css';）
```
npm install --save-dev style-loader css-loader

{
    test: /\.css$/,
    use: [
        { loader: 'style-loader' },
        {
            loader: 'css-loader',
            options: {
                modules: true
            }
        }
    ]
}
```

### 文件引用路径处理 (图片，字体文件)
```
npm install --save-dev file-loader

图片文件引用
{
    test: /\.(png|svg|jpg|gif)$/,
    use: [ 'file-loader' ]
},

字体文件引用
{
    test: /\.(woff|woff2|eot|ttf|otf)$/,
    use: [ 'file-loader' ]
}
```

### 数据文件加载 （xml、csv、tsv） 
```
npm install --save-dev csv-loader xml-loader

JSON是内置的可以直接引用（import Data from './data.json'）

{
  test: /\.(csv|tsv)$/,
  use: ['csv-loader']
},
{
  test: /\.xml$/,
  use: ['xml-loader']
}

```

### html 生成 
[推荐教程](https://blog.csdn.net/xs20691718/article/details/52100797)

```
npm install --save-dev html-webpack-plugin

plugins: [
    new HtmlWebpackPlugin({ title: 'Output Management' })
]
````

### 清理/dist文件夹之前的打包文件
```
npm install clean-webpack-plugin --save-dev

plugins: [
    new CleanWebpackPlugin(['dist'])
]
```

### 简单的web服务器
```
npm install --save-dev webpack-dev-server

webpack.config.js

    devServer: {
        contentBase: './dist'   // 启动这个目录
    },


package.json

    "scripts": {
        "start": "webpack-dev-server --open"    //npm 命令
    }

```

### 把webpack处理后的文件传递给一个服务器

```
npm install --save-dev express webpack-dev-middleware

安装 webpack-dev-middleware、 express（注意koa搭建会报错）

sever.js

    const express = require('express');
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const app = express();
    const config = require('./webpack.config.js');
    const compiler = webpack(config);

    app.use(webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath
    }));
    app.listen(3000, function () {
        console.log('Example app listening on port 3000!\n');
    });

```

### [热更新](https://webpack.docschina.org/guides/hot-module-replacement/)
```
webpack-dev-server 支持热更新
    plugins: [
    +   new webpack.NamedModulesPlugin(),
    +   new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: './dist',
        hot: true
    },


命令 --mode development(参数不能少，hot可以在webpack.config里配置)
    "dev": "webpack-dev-server --mode development --open --hot",

```

### tree shaking  移除js未引用代码 (这个环境里面并不添加它)
```

```

### 公共模块
```
公共包～jq等都被压缩到 commons.js 内
官方api错误，看这个贴（https://blog.csdn.net/github_36487770/article/details/80228147）

optimization: {  //公共模块抽离压缩到commons.js 内
    splitChunks:{
        cacheGroups: {
            commons: {
                name: "commons",
                chunks: "initial",
                minChunks: 2
            }
        }
    }
},
```

### 缓存
```
//
filename: '[name].[hash].js',

//chunkhash //内容压缩成的hash热加载的开发环境内不能使用
filename: '[name].[chunkhash].js',
```


---

## webpack 自带功能配置

### source map 错误源头文件跟踪（webapck 自带的不同加载）
```
devtool: 'inline-source-map'

```
