// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const { preprocessTypescript } = require('@nrwl/cypress/plugins/preprocessor');
const path = require('path');

const chromeFlags = [
  'CrossSiteDocumentBlockingIfIsolating',
  'CrossSiteDocumentBlockingAlways',
  'IsolateOrigins',
  'site-per-process'
].join(',')

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  // Preprocess Typescript file using Nx helper
  on('file:preprocessor', preprocessTypescript(config));

  on('before:browser:launch', (browser = {}, args) => {
    if (browser.name === 'chrome' || browser.name == 'electron') {
      args.push(`--disable-features="${chromeFlags}"`);
      const ignoreXFrameHeadersExtension = path.join(__dirname, '../extensions/ignore-x-frame-headers');
      args.push(`--load-extension=${ignoreXFrameHeadersExtension}`);
    }
    console.log(config, browser, args);
    return args;
  });
};
