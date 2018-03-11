const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const DIST_FOLDER = 'dist';

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, DIST_FOLDER),
        filename: 'index.js',
    },
    watchOptions: {
        poll: true,
        ignored: /node_modules/,
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(css|sss)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                sourceMap: true,
                                importLoaders: 1,
                                localIdentName: '[name]__[local]___[hash:base64:5]',
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                    ],
                }),
            }, {
                test: /\.(png|svg|jpg|gif)$/,
                loader: 'file-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
        modules: [
            path.resolve(__dirname, 'src'),
            'node_modules',
        ],
    },
    plugins: [
        new CleanWebpackPlugin([DIST_FOLDER]),
        new HtmlWebpackPlugin({
            title: '',
            template: './src/index.html',
        }),
        new ExtractTextPlugin({ filename: 'styles.css', allChunks: true }),
    ],
};
