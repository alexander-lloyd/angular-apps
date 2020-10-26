/* eslint-env node */

// This function is called when a project is opened or re-opened (e.g. due to the project's config changing)
const {preprocessTypescript} = require('@nrwl/cypress/plugins/preprocessor');
const path = require('path');

const chromeFlags = [
    'CrossSiteDocumentBlockingIfIsolating',
    'CrossSiteDocumentBlockingAlways',
    'IsolateOrigins',
    'site-per-process'
].join(',');
const ignoreXFrameHeadersExtension = path.join(__dirname, '../extensions/ignore-x-frame-headers');

/**
 * Add plugins to Cypress.
 *
 * @param on Used to hook into various events Cypress emits.
 * @param config Cypress config.
 * @returns Cypress config.
 */
module.exports = (on, config) => {
    // Preprocess Typescript file using Nx helper
    on('file:preprocessor', preprocessTypescript(config));

    on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.family === 'chromium' || browser.name !== 'electron') {
            launchOptions.args.push(`--disable-features="${chromeFlags}"`);
            launchOptions.args.push(`--load-extension=${ignoreXFrameHeadersExtension}`);
        }
        return launchOptions;
    });

    require('@cypress/code-coverage/task')(on, config);

    return config;
};
