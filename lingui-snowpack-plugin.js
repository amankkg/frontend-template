const { transform } = require("typescript")

module.exports = function (snowpackConfig, pluginOptions) {
  return {
    name: 'lingui-snowpack-plugin',
    async transform({id, contents, isDev, fileExt}) {
      if (fileExt === '.js') {
        const logId = isDev ? `console.log('File id: ${id}')` : ''
        const logExt = isDev ? `console.log('File ext: ${fileExt}')` : ''

        return `${contents}; ${logId}; ${logExt};`
      }
    }
  }
}