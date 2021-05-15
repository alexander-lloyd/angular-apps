module.exports = {
  stories: [],
  addons: [
    '@storybook/addon-a11y/register',
    '@storybook/addon-knobs/register'
  ],
  core: {
    builder: 'webpack5',
  }
};
