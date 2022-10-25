process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const environment = require('./environment')


environment.plugins.prepend(
    'HardSourceWebpackPlugin',
    new HardSourceWebpackPlugin(),
);

module.exports = environment.toWebpackConfig()
