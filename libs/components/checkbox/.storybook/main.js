const lib_main_module = require('../../../../.storybook/main');

lib_main_module.stories.push('../src/lib/**/*.stories.mdx');
lib_main_module.stories.push('../src/lib/**/*.stories.@(js|jsx|ts|tsx)');
module.exports = lib_main_module;
