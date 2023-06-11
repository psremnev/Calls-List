const path = require('path')
const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js'
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.(?:js|jsx|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env', '@babel/react']
          }
        }
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.less$/i,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.(mp3|jpg|png)$/i,
        loader: 'file-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react'
    }),
    new CopyPlugin({
      patterns: [
        { from: 'public', to: 'public' },
        { from: 'build', to: path.resolve(__dirname, 'docs') },
        { from: 'index.html', to: path.resolve(__dirname, 'docs') }
      ]
    })
  ]
}
