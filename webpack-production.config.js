var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

// Extract text plugin is not working for some reason
var css_to_file = true

module.exports = {
  entry:  [
    './client/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx'],
    alias: {
      shared: path.join(__dirname, 'shared')
    }
  },
  module: {
    loaders: [

      {test: /\.(jsx|js)?$/, exclude: /node_modules\/(?!fl-)/, loaders: ['babel']},

      {test: /\.css$/, loader: css_to_file
          ? 'style!css'
          : ExtractTextPlugin.extract('css', 'css')},
      {test: /\.styl$/, loader: css_to_file
        ? 'style!css!stylus'
        : ExtractTextPlugin.extract('stylus', 'css!stylus')},

      {test: /\.(png|jpg|gif|wav|mp3)$/, loader: 'file'},

      // Needed for the css when [bootstrap-webpack](https://github.com/bline/bootstrap-webpack)
      // loads bootstrap's css.
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&mimetype=image/svg+xml" },

    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.DEBUG ? 'development' : 'production') // This has effect on the react lib size
      }
    }),
    css_to_file ? new ExtractTextPlugin('app.css', {allChunks: true}) : ''
  ]
}