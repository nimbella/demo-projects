const path = require('path')
const actionDir = '../../../packages/hello-ts/hello/'

module.exports = {
  entry: './Hello.ts',
  mode: 'production',
  target: 'node',
  node: false,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  externals: function(context, request, callback) {
    if (/^[^.]/.test(request)){
      return callback(null, 'commonjs2 ' + request)
    }
    callback()
  },
  output: {
    filename: 'index.js',
    path: path.resolve(actionDir),
    libraryTarget: 'commonjs-module'
  },
  optimization: {
    minimize: false
  }
}
