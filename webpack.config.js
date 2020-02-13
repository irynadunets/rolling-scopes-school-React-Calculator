const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: "development",
module: {
  rules: [
   {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    },
    {
      test: /\.(png|jpg|gif|svg|ico|ttf)$/,
      use: [
        {
           loader: 'file-loader',
           options: {
             outputPath: 'images',
             name: '[name]-[sha1:hash:7].[ext]'
           }
          }]
    },
    {
      test: /\.(ttf|otf|eoa|woff|woff2)$/,
      use: [
        {
           loader: 'file-loader',
           options: {
             outputPath: 'fonts',
             name: '[name].[ext]'
           }
          }]
    },
    {
      test: /\.(s[ca]ss)$/,
      use: [ 'style-loader','css-loader','sass-loader']
    },
    {
      test: /\.(css)$/,
      use: ['style-loader','css-loader']
     },
     {
      test: /\.json$/,
      loader: 'json-loader'
    }
    ]
   },
   plugins:[
     new HtmlWebpackPlugin({
       title: 'React lease-loan calculator',
       buildTime: new Date().toISOString(),
       template:'public/index.html'
     }
     )
   ],
   devServer: {
     open: true
   }
 };
