/* eslint-env node */
/* eslint-disable prefer-named-capture-group */

const includes = require('path').join(__dirname, '..', 'spotify-player', 'src');

module.exports = {
    module: {
        rules: [
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
