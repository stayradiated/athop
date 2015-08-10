'use strict';

var _ = require('lodash');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

    entry: {
        bundle: [
            './src/main.js',
        ],
    },

    output: {
        path: './dist/',
        filename: '[name].js',
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['react-hot', 'jsx', 'babel'],
            },
            {
                test: /\.(woff|eot|svg|ttf|png)$/,
                loaders: ['url?limit=8192'],
            },
        ]
    },

};

var mixins;
if (process.env.NODE_ENV === 'production') {
    mixins = {

        output: {
            publicPath: 'https://stayradiated.github.io/athop',
        },

        plugins: [
            new ExtractTextPlugin('style.css', {
                allChunks: true,
            }),
            new webpack.optimize.UglifyJsPlugin({
                output: {comments: false},
            }),
        ],

        module: {
            loaders: [{
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css!autoprefixer!sass'),
            }],
        },

    };
} else {
    mixins = {

        entry: {
            bundle: [
                'webpack-dev-server/client?http://localhost:9999',
                'webpack/hot/only-dev-server',
            ],
        },

        output: {
            publicPath: 'http://localhost:8080/',
        },

        module: {
            loaders: [{
                test: /\.scss$/,
                loaders: ['style', 'css', 'autoprefixer', 'sass'],
            }],
        },

    };
}

_.merge(module.exports, mixins, function (a, b) {
  if (_.isArray(a)) {
    return a.concat(b);
  }
});

console.log(JSON.stringify(module.exports, null, 2));
