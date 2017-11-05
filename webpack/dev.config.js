require('babel-polyfill')

// Webpack config for development
const path = require('path')
const webpack = require('webpack')
const AssetsPlugin = require('assets-webpack-plugin')

const assetsPath = path.resolve(__dirname, '../public')
const host = (process.env.HOSTNAME || 'localhost')
const port = (+process.env.PORT) + 1 || 4001

module.exports = {
  // devtool: 'inline-source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    app: [
      'bootstrap-sass-loader!./client/theme/bootstrap.config.js',
      'font-awesome-webpack!./webpack/fontAwesome/font-awesome.config.js',
      './client/app.js',
      'webpack-hot-middleware/client?reload=true&path=http://' + host + ':' + port + '/__webpack_hmr',
    ],
    admin: [
      'bootstrap-sass-loader!./client/theme/bootstrap.config.js',
      'font-awesome-webpack!./webpack/fontAwesome/font-awesome.config.js',
      './client/admin.js',
      'webpack-hot-middleware/client?reload=true&path=http://' + host + ':' + port + '/__webpack_hmr',
    ],
  },
  output: {
    libraryExport: 'default',
    path: assetsPath,
    filename: '[name].js',
    publicPath: 'http://' + host + ':' + port + '/public/',
  },
  module: {
    loaders: [
      // turn off AMD when loading backbone
      {
        test: /backbone\.js$/,
        loader: 'imports-loader?define=>false',
      },

      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['babel-preset-react-hmre'].map(require.resolve),
        },
      },

      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'autoprefixer-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'autoprefixer-loader'],
      },

      {test: /\.(png|jpg|gif|wav|mp3)$/, use: 'file-loader'},

      {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&mimetype=application/font-woff'},
      {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&mimetype=application/font-woff'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&mimetype=application/octet-stream'},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: 'file-loader'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&mimetype=image/svg+xml'},
    ],
  },
  resolve: {
    modules: [
      'node_modules',
    ],
  },
  plugins: [
    new AssetsPlugin({prettyPrint: true}),
    new webpack.optimize.CommonsChunkPlugin({name: 'shared', filename: 'shared.js'}),
    new webpack.optimize.OccurrenceOrderPlugin(),
    // ignore jquery (used by backbone)
    new webpack.IgnorePlugin(/^jquery$/),
    new webpack.IgnorePlugin(/^bootstrap-sass$/),
    // hot reload
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    new webpack.DefinePlugin({
      'process.env': {
        DEBUG: process.env.DEBUG,
        CLIENT: true,
        SERVER: false,
      },
    }),
  ],
  stats: 'none',
}
