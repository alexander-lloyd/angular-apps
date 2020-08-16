/* eslint-env node */
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
    }
};
