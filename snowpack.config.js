const dotenv = require('dotenv')

dotenv.config()

const {PORT = 8080, BROWSER = 'none'} = process.env

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    '.': '/dist',
    public: '/',
  },
  devOptions: {
    port: parseInt(PORT),
    open: BROWSER,
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-babel',
  ],
  install: ['react/jsx-runtime', '@emotion/styled/base'],
}
