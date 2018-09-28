const path = require('path');
const GasPlugin = require('gas-webpack-plugin');
const Copy = require('copy-webpack-plugin')
const Clean = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'production',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      }
    ]
  },
  plugins: [
    new GasPlugin(),
    new Copy([
      {
        from: 'appsscript.json',
        to: 'appsscript.json'
      }
    ]),
    new Clean(['dist/**/*'])
  ]
};

