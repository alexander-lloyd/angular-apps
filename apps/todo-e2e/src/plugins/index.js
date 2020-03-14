/* eslint-env node */

/* eslint-disable @typescript-eslint/no-var-requires */

/*
 * This example plugins/index.js can be used to load plugins
 *
 * You can change the location of this file or turn off loading
 * The plugins file with the 'pluginsFile' configuration option.
 *
 * You can read more here:
 * https://on.cypress.io/plugins-guide
 */

/*
 * This function is called when a project is opened or re-opened (e.g. due to
 * The project's config changing)
 */

const {preprocessTypescript} = require('@nrwl/cypress/plugins/preprocessor');

module.exports = (on, config) => {
  /*
   * `on` is used to hook into various events Cypress emits
   * `config` is the resolved Cypress config
   */

  // Preprocess Typescript file using Nx helper
  on('file:preprocessor', preprocessTypescript(config));
};
