const path = require('path')
const util = require('util')
const {getConfig} = require('@lingui/conf')
const {
  createCompiledCatalog,
  getCatalogs,
  getCatalogForFile,
} = require('@lingui/cli/api')

const log = obj => console.log(util.inspect(obj, false, null, true))

module.exports = function (snowpackConfig, pluginOptions) {
  const strict = process.env.NODE_ENV !== 'production'

  const config = getConfig(
    // configPath
    // cwd
  )

  log({config})
  
  return {
    name: 'lingui-snowpack-plugin',
    resolve: {
      input: ['.po'],
      output: ['.js'],
    },
    async load({filePath}) {
      const catalogRelativePath = path.relative(config.rootDir, filePath)

      log({catalogRelativePath})

      // if (!EMPTY_EXT || JS_EXT) throw new Error(`File extension is mandatory, ${catalogRelativePath}`)

      const fileCatalog = getCatalogForFile(
        catalogRelativePath,
        getCatalogs(config)
      )

      log({fileCatalog})

      const {locale, catalog} = fileCatalog
      const catalogs = catalog.readAll()

      log({catalogs})

      const messages = Object.keys(catalogs[locale]).reduce((acc, key) => {
        acc[key] = catalog.getTranslation(catalogs, locale, key, {
          fallbackLocales: config.fallbackLocales,
          sourceLocale: config.sourceLocale,
        })

        return acc
      }, {})

      log({messages})

      const compiled = createCompiledCatalog(locale, messages, {
        strict,
        namespace: config.compileNamespace,
        pseudoLocale: config.pseudoLocale,
      })

      log({compiled})

      return compiled
    }
  }
}
