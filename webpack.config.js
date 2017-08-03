const path = require('path'),
      ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = options => {
  return {
    entry: './src/entry.jsx',

    devServer: {
      contentBase: path.join(__dirname, 'public'),
      port: 8000,
      compress: true,
    },

    output: {
      path: path.join(__dirname, 'public'),
      filename: './bundle.js',
    },

    resolve: {
      extensions: ['.js', '.jsx', '.json'],
    },

    module: {
      rules: [
        {
          test: /\.js$|\.jsx$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
              },
            },
          ],
        },

        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader'],
          }),
        },

        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          loader: 'file-loader?name=public/fonts/[name].[ext]',
        },
      ],
    },
    plugins: [
      new ExtractTextPlugin('style.css'),
    ],
  };
};
