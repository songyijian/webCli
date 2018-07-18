const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

// 获取本地
function getIPAdress() {
    var interfaces = require('os').networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}

module.exports = {
    // context: path.resolve(__dirname, "../pc"),
    entry: {
        mian: '../pc/src/mian.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../pc/dist')
    },
    devtool: 'inline-source-map',
    plugins: [
        // 清理旧包，生产使用
        new CleanWebpackPlugin(['dist']),
        //自动生成HTML
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../pc/index.html'),//模版
            // chunks: ['wp2'],//引入的文件
            inject: true,    //允许插件修改哪些内容，包括head与body
            hash: true,    //为静态资源生成hash值
            minify: {    //压缩HTML文件
            // removeComments: true,    //移除HTML中的注释
            // collapseWhitespace: false    //删除空白符与换行符
            }
        }),

        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.HashedModuleIdsPlugin()
    ],
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
    devServer: {
        contentBase: path.resolve(__dirname, '../pc/dist'),
        hot: true,
        //服务端压缩是否开启
        // compress: true,
        host: getIPAdress(), //'localhost'
        // 接口代理
        // proxy: {
        //     '/index.php': {
        //         target: 'http://localhost:80/index.php',
        //         secure: false
        //     }
        // }

    },
    module: {
        rules: [
            {   //支持html热更新
                test: /\.(htm|html)$/,
                use: [
                    'raw-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: { modules: true }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [ 'file-loader' ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [ 'file-loader' ]
            },
            {
                test: /\.(csv|tsv)$/,
                use: ['csv-loader']
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            }
        ]
    }
  };