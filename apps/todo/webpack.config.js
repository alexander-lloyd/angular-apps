/* eslint-env node */
const childProcess = require('child_process');
const webpack = require('webpack');

const packageJson = require('../../package.json');


function git(command) {
    return childProcess.execSync(`git ${command}`).toString();
}

module.exports = {
    module: {
        rules: [
            {
                test: /\.scss$/u,
                loader: 'postcss-loader',
                options: {
                    ident: 'postcss',
                    syntax: 'postcss-scss',
                    plugins: () => [
                        require('postcss-import'),
                        require('tailwindcss'),
                        require('autoprefixer')
                    ]
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            BUILD_TIME: webpack.DefinePlugin.runtimeValue(Date.now, true),
            COMMIT_HASH: JSON.stringify(git('rev-parse --short HEAD')),
            VERSION: JSON.stringify(packageJson.version)
        })
    ]
};
