/* eslint-env node */

/**
 * This function is called when a project is opened or re-opened (e.g. due to
 * the project's config changing)
 */

const {preprocessTypescript} = require('@nrwl/cypress/plugins/preprocessor');

/**
 * @param on is used to hook into various events Cypress emits
 * @param config is the resolved Cypress config
 */
module.exports = (on, config) => {
    // Preprocess Typescript file using Nx helper
    on('file:preprocessor', preprocessTypescript(config));
};
