var path = require('path');

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-1'],
          plugins: ["transform-decorators-legacy"]
        }
      },
      {
        test: /\.sass$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      },
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    port: 8000
  }
};
