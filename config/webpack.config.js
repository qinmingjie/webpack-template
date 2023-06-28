const path = require("path");

const PostcssPresetEnv = require("postcss-preset-env");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { DefinePlugin } = require("webpack");

const { merge } = require("webpack-merge");
const devOptions = require("./webpack.dev");
const prodOptions = require("./webpack.prod");

const commonConfig = {
  entry: path.resolve(__dirname, "../src/main.js"),
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name]_[contenthash:4].js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.js$/,
        use: ["babel-loader"],
        exclude: [/node_modules/]
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2
            }
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [PostcssPresetEnv]
              }
            }
          },
          "sass-loader"
        ]
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 200 * 1024
          }
        },
        generator: {
          filename: "image/[name]_[contenthash4].[ext]"
        }
      },
      {
        test: /\.(ttf|woff|woff2)$/,
        type: "asset/resource",
        generator: {
          filename: "font/[name][ext]"
        }
      },
      {
        test: /\.vue$/,
        use: ["vue-loader"]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html")
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../src/static"),
          to: "static"
        }
      ]
    }),
    new DefinePlugin({
      TITLE: JSON.stringify("Document"),
      __VUE_OPTIONS_API__: JSON.stringify(true),
      __VUE_PROD_DEVTOOLS__: JSON.stringify(false)
    })
  ],
  resolve: {
    extensions: [".js", ".json", ".jsx", ".vue"]
  }
};

module.exports = (env) => {
  const { development = false } = env;
  const config = development ? devOptions : prodOptions;
  return merge(commonConfig, config);
};
