const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: `${__dirname}/src/js`,
  entry: {
    // background: './background.js',
    contents: './contents.js',
  },
  output: {
    path: path.resolve(__dirname, './build/js'),
    filename: '[name].bundle.js',
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'stage-3'],
              // plugins: ['transform-runtime'],
              // plugins: ['@babel/transform-runtime'],
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
};
