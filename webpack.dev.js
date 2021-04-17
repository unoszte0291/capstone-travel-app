const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
            entry: './src/client/index.js',
            mode: 'development',
            devtool: 'source-map',
            output: {
                        libraryTarget: 'var',
                        library: 'Client',
                    },
            stats: 'verbose',
            module: {
                    rules: [
                            {
                            test: '/\.js$/',
                            exclude: /node_modules/,
                            loader: 'babel-loader'
                            },
                            {
                            test: /\.scss$/,
                            use: ['style-loader', 'css-loader', 'sass-loader']
                            },
                            // added from Menter help https://knowledge.udacity.com/questions/537120
                            {
                            test: /\.(jpe?g|png|gif|svg)$/i,
                            loader: "file-loader",
                            options: {
                            name: "[path][name].[ext]",
                                },
                            },
                            ]
                    },
            plugins: [
                        new WorkboxPlugin.GenerateSW(),
                        new HtmlWebPackPlugin({
                        template: './src/client/views/index.html',
                        filename: './index.html',
                        }),
                        new CleanWebpackPlugin({
                        dry: true,
                        verbose: true,
                        cleanStaleWebpackAssets: true,
                        protectWebpackAssets: false,
                        }),
                    ],
                };