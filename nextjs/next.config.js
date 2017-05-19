const webpack = require('webpack')

module.exports = {
  webpack (cfg) {
    cfg.plugins.push(new webpack.DefinePlugin({
      'process.env.GRAPHQL_URI': JSON.stringify(process.env.GRAPHQL_URI)
    }))

    return cfg
  }
}
