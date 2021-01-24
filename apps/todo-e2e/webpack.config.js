/* eslint-env node */
/* eslint-disable prefer-named-capture-group */
const config = require('../todo/webpack.config');

const includes = require('path').join(__dirname, '..', 'todo', 'src');

module.exports = {
    ...config,
    module: {
        ...config.module,
        rules: [
            ...config.module.rules,
            {
                test: /\.(js|ts)$/u,
                loader: 'istanbul-instrumenter-loader',
                options: {
                    esModules: true
                },
                enforce: 'post',
                include: includes,
                exclude: [
                    /\.(e2e|spec)\.ts$/u,
                    /node_modules/u,
                    /(ngfactory|ngstyle)\.js/u
                ]
            }
        ]
    }
};
