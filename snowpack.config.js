/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    '.': '/dist',
    public: {url: '/', static: true},
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
  ],
};
