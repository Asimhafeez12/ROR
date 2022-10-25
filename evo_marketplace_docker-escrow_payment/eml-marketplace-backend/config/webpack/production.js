process.env.NODE_ENV = process.env.NODE_ENV || 'production'

const environment = require('./environment')

const UglifyJSPlugin = require("uglifyjs-webpack-plugin")
environment.plugins.delete("UglifyJs")
environment.plugins.append("UglifyJs", new UglifyJSPlugin())

module.exports = environment.toWebpackConfig()
