var webpack = require('webpack');
var path=require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');
//var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry:{	//入口文件(要打包的文件)
		wp1:"./js/js1.js"
		//wp2:"./js/js2.js"
	},
	output:{
		path:"./yes_js/",//打包到指定文件夹
		filename:"[name].js"//打包后的文件[name= entry[key]] 打包多个文件的关键
		//publicPath: "http://163.com/" //线上绝对地址
	},
	module:{
		loaders:[
			{//css
				test:/\.(css|less)$/,
				loaders:["style","css","less"],
				exclude:"/node_modules/"
			},
			{//处理图片
				test:/.(png|jpg)$/,
				loader: 'url-loader?limit=10000',
				exclude:"/node_modules/"
			},
			{
                test: /\.js$/,
                loader: 'babel?presets=es2015',
                exclude: /node_modules/
            },
     		{ 
     			test: /\.vue$/, 
     			loader: 'vue',
     			exclude:"/node_modules/"
     		}

		]
	},
	devServer:{},
	resolve:{
		extensions:['','.js',".css",'jsx']  //自动补全识别后缀
	},
	plugins:[
		//压缩代码
		/*new webpack.optimize.UglifyJsPlugin({ 
			compress:{
				warnings:false,
				drop_console:true
			},
			output:{ comments:false },
			minimize:true
		}),
		//new webpack.optimize.CommonsChunkPlugin(),
		//new webpack.optimize.OccurenceOrderPlugin(),
		//自动生成HTML
		
		
		new htmlWebpackPlugin( {	//模版
			filename:'../02.html',
			//title:"", 这里title没有用了是根据模版来的
			template:'./template.html',//模版
			chunks: ['wp2'],//引入的文件
			inject:true,    //允许插件修改哪些内容，包括head与body
			hash:true,    //为静态资源生成hash值
			minify:{    //压缩HTML文件
                removeComments:true,    //移除HTML中的注释
                collapseWhitespace:false    //删除空白符与换行符
            }
		})*/
		
		new htmlWebpackPlugin( {
			filename:'../01.html',
			title:"vue",
			chunks: ['wp1'],
			inject:true,    //允许插件修改哪些内容，包括head与body
			hash:true,    	//为静态资源生成hash值
			minify:{    //压缩HTML文件
                removeComments:true,    //移除HTML中的注释
                collapseWhitespace:false   //删除空白符与换行符
            }
		})
		
	]
}