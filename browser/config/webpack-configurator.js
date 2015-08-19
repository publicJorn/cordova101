var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var moment = require('moment');

function extractForProduction(loaders) {
  return ExtractTextPlugin.extract('style', loaders.substr(loaders.indexOf('!')));
}

module.exports = function (options) {
  var root = path.resolve(__dirname, '..');
  var client = path.join(root, 'client');

  var now = moment().format('YYYYMMDD_HHmmss');

  var mainBundle = [];
  var jsLoaders = 'babel';
  var lessLoaders = 'style!css!less';

  if (options.production) {
    lessLoaders = extractForProduction(lessLoaders);
  } else {
    mainBundle = [
      'webpack-dev-server/client?http://localhost',
      'webpack/hot/dev-server'
    ];
  }

  return {
    entry: {
      main: mainBundle.concat([
        path.join(client, 'main.js')
      ])
    },

    output: {
      path: path.join(root, 'dist'),
      filename: '[name]-' + now + '.js',
      publicPath: ''
    },

    debug: !options.production,
    devtool: options.devtool,

    //new webpack.optimize.CommonsChunkPlugin('init.js'),
    plugins: options.production ? [
      new ExtractTextPlugin('[name]-' + now + '.css'),
      new HtmlWebpackPlugin({
        template: path.join(client, 'index.html')
      })
    ] : [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: path.join(client, 'index.html')
      })
    ],

    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: jsLoaders,
          include: [client]
        },
        {
          test: /\.less$/,
          loader: lessLoaders
        },
        {
          test: /\.png$/,
          loader: "url?limit=102400&mimetype=image/png"
        },
        {
          test: /\.svg$/,
          loader: "url?limit=102400&mimetype=image/svg+xml"
        },
        {
          test: /\.gif$/,
          loader: "url?limit=102400&mimetype=image/gif"
        },
        {
          test: /\.jpg$/,
          loader: "file"
        }
      ]
    },

    resolve: {
      extensions: ['', '.js', '.json', 'less', 'css'],
      root: client
    },

    devServer: {
      port: 3000,
      hot: true,
      contentBase: client,
      //inline: true, // same as 'webpack-dev-server/client' in entry object
      colors: true
    }
  };
};
