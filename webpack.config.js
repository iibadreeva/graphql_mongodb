const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const WebpackBar = require('webpackbar');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  mode: isDev ? 'development' : 'production',
  devtool: isDev && 'inline-source-map',
  target: isDev ? 'browserslist' : 'web', // Fix https://github.com/webpack/webpack-dev-server/issues/2758#issuecomment-710086019
  entry: {
    app: './client/index.tsx'
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.scss'],
    alias: {
      '@': path.resolve(__dirname, 'client/')
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.scss$/i,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new ESLintPlugin({
      extensions: ['.ts', '.tsx']
    }),
    new WebpackBar()
  ],
  devServer: {
    contentBase: './build',
    historyApiFallback: true,
    publicPath: '/',
    hot: true,
    open: true,
    port: 8000
  }
};
