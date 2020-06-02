const path = require('path');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const MomentTimezoneDataPlugin = require('moment-timezone-data-webpack-plugin');
const currentYear = new Date().getFullYear();

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new MomentLocalesPlugin(), //all we need for en
    new MomentTimezoneDataPlugin({
      matchZones: /^America/
  }),

  // To keep all zones but limit data to specific years, use the year range options
  new MomentTimezoneDataPlugin({
      startYear: currentYear - 20,
      endYear: currentYear + 20,
  }),
  ]
};