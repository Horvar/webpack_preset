const path = require('path');
var webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const AutoPrefixer = require('autoprefixer');

const CopyWebpackPlugin = require('copy-webpack-plugin');
var ImageminPlugin = require('imagemin-webpack-plugin').default;

const RemovePlugin = require('remove-files-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin({}),
            new UglifyJsPlugin({})
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        port: 4200,
        writeToDisk: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader?url=false', 'postcss-loader']
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader?url=false', 'postcss-loader', 'less-loader']
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader?url=false', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /fancybox[\/\\]dist[\/\\]js[\/\\]jquery.fancybox.cjs.js/,
                use: "imports-loader?jQuery=jquery,$=jquery,this=>window"
            }
        ]
    },
    plugins: [
        new HTMLPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: './css/style.css'
        }),
        new RemovePlugin({
            before: {
                include: [
                    './dist'
                ]
            }
        }),
        // new CopyWebpackPlugin({
        //     patterns: [
        //         {from:'src/img', to:'img'},
        //         // {from:'src/fonts', to:'fonts'},
        //         // {from:'src/docs', to:'docs'}
        //     ]
        // }),
        // new ImageminPlugin({ 
        //     test: /\.(jpe?g|png|gif|svg)$/i,
        //     // добавить опции про качество
        //     // сделать запуск только при продусе
        //     // https://github.com/imagemin/imagemin
        //     // https://www.npmjs.com/package/imagemin-webpack-plugin
        // })
        new webpack.ProvidePlugin( {
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        } )
    ],
}