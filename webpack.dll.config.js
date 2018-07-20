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
const webpack = require("webpack");
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // 生成 other文件插件
const theme = require('./src/theme.json');

module.exports = {
    entry: {
        'libs': [
            "antd",
            "copy-to-clipboard",
            "crypto-browserify",
            "crypto-js",
            "dompurify",
            "echarts",
            "element-resize-event",
            "g2",
            "g2-react",
            "immutable",
            "isomorphic-fetch",
            "jsondiffpatch-for-react",
            "jwt-decode",
            "lodash",
            "prop-types",
            "pubsub-js",
            "react",
            "react-addons-perf",
            "react-addons-shallow-compare",
            "react-codemirror",
            "react-dnd",
            "react-dnd-html5-backend",
            "react-dom",
            "react-graph-vis",
            "react-json-syntax-highlighter",
            "react-lz-editor",
            "react-router",
            "react-router-dom",
            "react-sortablejs",
            "react-split-pane",
            "screenfull",
            "socket.io-client",
            "sortablejs"
        ]
    },
    module: {
        //加载器配置
        rules: [{
            test: /\.js$/,
            include: [path.resolve(__dirname, 'src')],
            loader: 'babel-loader',
            exclude: path.join(__dirname, 'node_modules')
        },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", {
                        loader: "less-loader",
                        options: {
                            modifyVars: theme
                        }
                    }]
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.(png|jpg|jpeg|gif|ico)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 8192,
                        name: "../images/[name].[ext]"
                    }
                }]
            },
            {
                test: /\.(otf|eot|svg|ttf|woff)\??/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 8192,
                        name: "../fonts/[name].[ext]"
                    }
                }]
            }]
    },
    resolve: {
        extensions: ['.js', '.json', '.less', '.css'],
    },
    output: {
        path: path.join(__dirname, 'vendor','js'),
        filename: "[name].js",
        library: "[name]",

    },
    plugins: [
        new webpack.DllPlugin({
            context: __dirname,
            path: path.join(__dirname, "vendor", "manifest.json"),
            name: "[name]"
        }),
        new ExtractTextPlugin({
            filename: "../style/[name].css",
            allChunks: true
        })]
};
