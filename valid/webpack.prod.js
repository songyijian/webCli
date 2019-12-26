const path = require('path');
const resolve = (dir) => {return path.join(__dirname, dir)};
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
  mode: "production", //环境变量 development | production
  // 入口
  entry: {
    "main": resolve('./src/index.js')
  },
  // 出口
  output: {
    path: resolve('dist'),
    filename: '[name].[chunkhash:8].js'
  },
  module: {
    rules: [
      //MiniCssExtractPlugin css拆解成文件
      {
        test: /\.css/,
        use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader'], 
        exclude: /node_modules/,
        include:resolve("src"),
      },
      {
        test: /\.scss/,
        use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader', 'sass-loader'],
        exclude: /node_modules/,
        include:resolve("src"),
      },
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/react'],
              plugins: [
                ["@babel/plugin-proposal-decorators", { "legacy": true }]
              ]
            }
          }
        ],
        include:resolve("src"),
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    // 清空目录，文件有改动就重新打包
    new CleanWebpackPlugin(),

    //生成html
    new HtmlWebpackPlugin({
      filename: "index.html", //生成打包文件名
      template: resolve("./index.html"), //模板路径
      minify: { //生产模式可以进行配置
        // removeAttributeQuotes: true, //删除 html文件双引号
        collapseWhitespace: true //折叠控行
      },
      hash: true, //添加哈希值
    }),

    //css抽离
    new MiniCssExtractPlugin({
      filename: 'min.[chunkhash:8].css'
    }),

    // 允许创建一个在编译时可以配置的全局常量。这可能会对开发模式和生产模式的构建允许不同的行为非常有用
    new webpack.DefinePlugin({
      // NODE_ENV:JSON.stringify("DEV")
    })

  ],

  // 压缩配置
  optimization: {
    minimizer: [
      //压缩js mode: "production" 时有效
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // 如果使用，则必须设置为true
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        }
      }),

      //压缩css
      new OptimizeCssAssetsWebpackPlugin()
    ],
  }

  // 服务
  // devServer: {
  //   contentBase: './dist',
  //   port: "8088", // 设置端口号为8088
  //   inline: true, // 文件修改后实时刷新
  // }

}