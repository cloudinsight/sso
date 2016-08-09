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
        test: /\.(c|le)ss$/,
        loader: "style!css?modules&localIdentName=sso-[local]"
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
  }
}
