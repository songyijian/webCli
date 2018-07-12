# 通用项目 webpack 开发环境

## 打包
```
 npm run bulid  

```


## 当前环境依赖
---

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
npm install --save-dev  webpack-dev-middleware

npm install --save-dev koa2     //用来构建服务器

```




## webpack 自带功能配置
---
### source map 错误源头文件跟踪（webapck 自带的不同加载）
```
devtool: 'inline-source-map'

```
