const webpack = require('webpack')

module.exports = {
  devtool: 'inline-source-map', // ソースマップファイル追加 
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    __dirname + '/src/index', // エントリポイントのjsxファイル
  ],
  // React Hot Loader用のデバッグサーバ(webpack-dev-server)の設定
  devServer: {
    host: '0.0.0.0',
    contentBase: __dirname, // index.htmlの格納場所
    inline: true, // ソース変更時リロードモード
    hot: true, // HMR(Hot Module Reload)モード
    port: 3000, // 起動ポート
    historyApiFallback: true,
    // CORSの対策（debugホストが違うため)
    proxy: {
      // CORSを許可するパスとサーバ
      '/api/**': {
        target: 'http://localhost:8080',
        secure: false,
        changeOrigin: true
      }
    }
  },
  output: {
    publicPath: '/', // デフォルトルートにしないとHMRは有効にならない
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.NamedModulesPlugin(), // 名前変更無効プラグイン利用
    new webpack.HotModuleReplacementPlugin() // HMR(Hot Module Reload)プラグイン利用 
  ],
  resolve: {
    alias: {
      'jquery-ui': 'jquery-ui/ui'
    }
  },
  module: {
    rules: [{
      test: /\.js?$/, // 拡張子がjsで
      exclude: /node_modules/, // node_modulesフォルダ配下でなければ
      include: __dirname,
      use: {
        loader: 'babel-loader', // babel-loaderを使って変換する
        options: {
          plugins: [
            "transform-react-jsx",
            ["@babel/plugin-proposal-decorators", { "legacy": true }],
            "react-hot-loader/babel"
          ]
        }
      }
    }, {
      test: /\.css$/,
      loader:[ 'style-loader', 'css-loader' ]
    }]
  }
} 
