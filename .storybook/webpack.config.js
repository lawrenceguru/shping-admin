const path = require('path')
const paths = require('../config/paths')
const configFactory = require('../config/webpack.config')

// Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode }) => {
  // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  config.resolve.alias = {
    ...config.resolve.alias,
    'react-native': 'react-native-web',
    assets: `${paths.appSrc}/assets`,
    components: `${paths.appSrc}/components`,
    containers: `${paths.appSrc}/containers`,
    constants: `${paths.appSrc}/constants`,
    store: `${paths.appSrc}/store`,
    utils: `${paths.appSrc}/utils`,
    themes: `${paths.appSrc}/components/themes`,
    src: `${paths.appSrc}`
  }

  // Return the altered config
  return config
}
