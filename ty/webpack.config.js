const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');
let itemsrc = `./test`
console.log('-------',path.resolve(__dirname, 'dist'))

module.exports={
    //入口文件的配置项
    entry:{
        mian: `./test/js/index.js`
    },
    //出口文件的配置项
    output:{
        //打包的路径文职
        path: path.resolve(__dirname, './test/dist'),
        //打包的文件名称,[entry.key].js可以输出多个
        filename: '[mian].js'
    },
    //模块：例如解读CSS,图片如何转换，压缩
    module:{
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    //插件，用于生产模版和各项功能
    plugins:[  
        new uglify()    //JS压缩插件
    ],
    //配置webpack开发服务功能
    devServer:{
        //设置基本目录结构
        contentBase: path.resolve(__dirname, './test/dist'),
        //服务器的IP地址，可以使用IP也可以使用localhost
        host: 'localhost',
        //服务端压缩是否开启
        compress: true,
        //配置服务端口号
        port: 1717
    }
}