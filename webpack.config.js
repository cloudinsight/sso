const plugins = [];
const webpack = require('webpack');
const readFileSync = require('fs').readFileSync;
const execSync = require('child_process').execSync;

let localIdentName = 'sso-[local]';

if (process.env.NODE_ENV === 'production') {
  localIdentName = 'sso-[hash:base64:8]';
  const banner = readFileSync('./LICENSE').toString();
  const revision = execSync('git rev-parse HEAD').toString()
  const url = `https://github.com/cloudinsight/sso/commit/${revision}`;
  plugins.push(new webpack.BannerPlugin(`${banner}\n${url}`));
}
let gitDescribe = execSync('git describe').toString().replace(/\s/g, '');
module.exports = {
  entry: {
    footer: './src/footer.js',
    nav: './src/nav.js'
  },
  output: {
    filename: '[name].js',
    path: './dist'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loader: `style!css?modules&localIdentName=${localIdentName}`
      },
      {
        test: /\.ejs$/,
        loader: 'ejs'
      },
      {
        test: /\.(png|svg)$/,
        loader: 'url'
      }
    ]
  },
  plugins: plugins
}
