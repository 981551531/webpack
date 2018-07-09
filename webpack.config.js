const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path')

module.exports = {
     devtool: 'eval-source-map',//用户生成对照源文件，方便调试
    entry: path.resolve(__dirname, 'app/index.js'),//已多次提及的唯一入口文件
    output: {
        path: __dirname + "/build",//打包后的文件存放的地方
        filename: "bundle.js"//打包后输出文件的文件名
    },
    devServer: {     ///webpack-dev-server 服务配置
        contentBase: "./public",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新
        port: 7060
    },
    module: {
        rules: [
            {test: /(\.jsx|\.js)$/, use: {loader: "babel-loader"}, exclude: /node_modules/},
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true, // 指定启用css modules
                            localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
                        }
                    }, {
                        loader: "postcss-loader"
                    }
                    ]
            }
        ]
    }   ,
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
        })   ,
        new webpack.HotModuleReplacementPlugin()//热加载插件
    ],
}