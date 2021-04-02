const dotenv = require('dotenv')

dotenv.config()

const {PORT = 8080, BROWSER = 'none'} = process.env

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    '.': '/dist',
    public: '/',
  },
  exclude: [
    'node_modules',
    '.env',
    '.example.env',
    '.gitignore',
    '.npmrc',
    'babel.config.json',
    'LICENSE',
    'package-lock.json',
    'package.json',
    'README.md',
    'snowpack.config.js',
    'tsconfig.dev.json',
    'tsconfig.json',
  ],
  devOptions: {
    port: parseInt(PORT),
    open: BROWSER,
  },
  plugins: [
    '@lingui/snowpack-plugin',
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-babel',
    '@snowpack/plugin-optimize',
  ],
  packageOptions: {knownEntrypoints: ['react/jsx-runtime']},
  alias: {
    '@emotion/styled': '@emotion/styled/base',
    atoms: './atoms',
    pages: './pages',
  },
}
