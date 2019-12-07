const HtmlWebpackPlugin = require("html-webpack-plugin");

const HtmlWebpackPlugins = (pages = [], minify = {}) => {
  if (!Array.isArray(pages)) return [];
  return pages.map(page => {
    return new HtmlWebpackPlugin({
      filename: page,
      template: `./src/${page}`,
      minify: { ...minify }
    });
  });
};

const common = {
  // entry: { main: "./main.js", vendor: "./vendor.js" },
  entry: { main: "./main.js" },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [{ loader: "html-loader" }]
      },
      {
        // FIXME: add image compressor
        test: /\.(svg|png|jpeg|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[hash].[ext]",
              outputPath: "img",
              esModule: false
            }
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                optimizationLevel: 3
              },
              pngquant: {
                speed: 4,
                quality: [0.65, 0.9]
              },
              gifsicle: {
                interlaced: false,
                optimizationLevel: 1
              }
            }
          }
        ]
      }
    ]
  }
};

module.exports = { HtmlWebpackPlugins, common };
