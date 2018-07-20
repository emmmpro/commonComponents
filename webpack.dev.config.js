/**
 *　　　　　　　　┏┓　　　┏┓+ +
 *　　　　　　　┏┛┻━━━┛┻┓ + +
 *　　　　　　　┃　　　　　　　┃ 　
 *　　　　　　　┃　　　━　　　┃ ++ + + +
 *　　　　　　 ████━████  +
 *　　　　　　　┃　　　　　　　┃ +
 *　　　　　　　┃　　　┻　　　┃
 *　　　　　　　┃　　　　　　　┃ + +
 *　　　　　　　┗━┓　　　┏━┛
 *　　　　　　　　　┃　　　┃ + + + +
 *　　　　　　　　　┃　　　┃ + 　　　　神兽保佑,代码无bug　　
 *　　　　　　　　　┃　　　┃　　+　　　　　　　　　
 *　　　　　　　　　┃　 　　┗━━━┓ + +
 *　　　　　　　　　┃ 　　　　　　　┣┓
 *　　　　　　　　　┃ 　　　　　　　┏┛
 *　　　　　　　　　┗┓┓┏━┳┓┏┛ + + + +
 *　　　　　　　　　　┃┫┫　┃┫┫
 *　　　　　　　　　　┗┻┛　┗┻┛+ + + +
 */
const path = require("path");
const webpack = require('webpack'); // 导入webpack模块
const CopyWebpackPlugin = require('copy-webpack-plugin');//拷贝文件
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // 生成 other 文件插件
const theme = require('./src/theme.json');

module.exports = {
    devtool: 'source-map',
    entry: {
        // 入口点文件
        'app': ['index.js'],
    },
    output: {   //输出点
        path: path.resolve(__dirname, 'ui'),
        filename: `./js/[name].js`,
        publicPath: "/",
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require("./vendor/manifest.json"),
            name: 'libs'
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'src/fonts/'),
                to: './fonts/'
            },
            {
                from: path.resolve(__dirname, 'src/iconfont/'),
                to: './iconfont/'
            },
            {
                from: path.resolve(__dirname, 'vendor/'),
                to: './'
            }
        ]),
        new ExtractTextPlugin({
            filename: "./style/[name].css",
            allChunks: true,
        })
    ],
    module: {
        //加载器配置
        rules: [
            {
                test: /\.js$/,
                include: [path.resolve(__dirname, 'node_modules', '*')],
                loader: 'babel-loader'
            }, {
                test: /\.js$/,
                include: [path.resolve(__dirname, 'src')],
                loader: 'babel-loader'
            }, {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader",
                        {
                            loader: "less-loader",
                            options: {
                                modifyVars: theme
                            }
                        }
                    ]
                })
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }, {
                test: /\.(png|jpg|jpeg|gif|ico)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 8192,
                            name: "./images/[name].[ext]"
                        }
                    }
                ]
            }, {
                test: /\.(otf|eot|svg|ttf|woff)\??/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 8192,
                            name: './font/[name].[ext]',
                        }
                    }
                ]
            }
        ]
    },
    //其它解决方案配置
    resolve: {
        //绝对路径, 查找module的话从这里开始查找(可选)
        modules: [
            path.join(__dirname, "src"),
            "node_modules"
        ],
        // //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['.js', '.json', '.less', '.css'],
        //别名配置
        alias: {
        }
    },
    devServer: {
        contentBase: path.join(__dirname, 'ui'),
        inline: false,
        host: '0.0.0.0',
        port: 8000,
        disableHostCheck: true,
        historyApiFallback: true,
    }
};
