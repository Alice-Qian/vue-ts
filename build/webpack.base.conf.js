const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: {
    path: path.resolve(__dirname, '../src/main.ts')
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[hash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.l?(c|e)ss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'less-loader' },
          { loader: 'postcss-loader' }
        ]
      },
      // es6 polyfill 具体配置在根目录 .babelrc文件里，配置是babel-preset-env在处理，；也可以不配置，用它的默认配置，这样用它就没啥意义了
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      // 处理图片
      // 需要安装（-D）file-loader，url-loader依赖file-loader
      {
        test: /\.(png|jpg|jfif|jpeg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // 低于这个limit就直接转成base64插入到style里，不然以name的方式命名存放
              // 这里的单位时bit
              limit: 8192,
              name: 'static/images/[hash:8].[name].[ext]',
              outputPath: "images/",
              esModule: false // 关闭，否则图片路径解析不正确
            }
          }
        ]
      },
      // 字体图标啥的，跟图片分处理方式一样
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'url-loader'
          }
        ]
      },
      // 以单文件组件 (SFCs)的格式撰写 Vue 组件通过它解析
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        }
      },
    ]
  },
  plugins: [
    // 它的职责是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块。
    // 例如，如果你有一条匹配 /\.js$/ 的规则，那么它会应用到 .vue 文件里的 <script> 块
    new VueLoaderPlugin(),
    // 生成一个新的index.html,将打包生成的js,css自动引入
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
    }),
  ],
  resolve: {
    alias: {
      // 配置别名'vue$'，不然import 'vue'时，webpack找不到
      'vue$': 'vue/dist/vue.esm.js',
      // 这个为src配置别名，非必需，为方便而已
      '@': path.resolve(__dirname, '../src')
    },
    // 在import这些拓展名的文件时，可以省略拓展名
    extensions: ['*', '.js', '.json', '.vue', '.ts']
  }
}