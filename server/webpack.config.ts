import * as webpack from 'webpack';
import * as path from 'path';

declare const __dirname;

const nodeExternals = require('webpack-node-externals');
const UglifyJsPlugin  = require('webpack/lib/optimize/UglifyJsPlugin');

const config: webpack.Configuration = {
   entry: './index.ts',
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
   },
   module: {
      rules: [
         {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
         }
      ]
   },
   resolve: {
      extensions: ['.tsx', '.ts', '.js']
   },
   plugins: [
      new webpack.IgnorePlugin(/vertx/),
      new UglifyJsPlugin ({

      })
   ],
   target: 'node',
   externals: [nodeExternals()]
};

export default config;
