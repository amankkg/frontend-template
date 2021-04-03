// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    '.': '/dist',
    public: '/',
  },
  plugins: [
    '@lingui/snowpack-plugin',
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    ['@snowpack/plugin-babel', {input: ['.tsx']}], // TODO: write eslint rule to prevent usage of macros in non-tsx files
    '@snowpack/plugin-optimize',
  ],
  packageOptions: {
    knownEntrypoints: ['react/jsx-runtime'],
  },
  devOptions: {
    port: parseInt(PORT),
    open: BROWSER,
  },
  buildOptions: {
    sourcemap: true,
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
  alias: {
    '@emotion/styled': '@emotion/styled/base',
    atoms: './atoms',
    pages: './pages',
  },
}
