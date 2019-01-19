const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require('path');

const htmlPlugin = new HtmlWebPackPlugin({
    template: './public/index.html',
    filename: './index.html'
});

const scssPlugin = new MiniCssExtractPlugin({
    filename: '[name].scss',
    chunkFilename: '[id].scss'
})

module.exports = (env = {}) => {
    const isDevBuild = !env.production;
    const apiHost = env.apiHost || 'localhost';
    const apiPort = env.apiPort ? Number(env.apiPort) : 8080;
    const apiProtocol = env.apiProtocol || 'http';

    const apiUrl = `${apiProtocol}://${apiHost}:${apiPort}/api`;

    console.info(`Using apiUrl: ${apiUrl}`);
    console.info(`isDevBuild: ${isDevBuild}`);

    return [{
        entry: './src/index.tsx',
        resolve: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
        module: {
            rules: [
                { test: /\.tsx?$/, loader: 'tslint-loader', enforce: 'pre', options: { emitErrors: isDevBuild } },
                { test: /\.tsx?$/, use: 'ts-loader?silent=true' },
                { test: /\.html$/, use: [ { loader: 'html-loader', options: { minimize: !isDevBuild }}]},
                {
                    test: /\.s?css$/,
                    use: [
                        isDevBuild ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader',
                    ],
                },
                { test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=25000', include: __dirname + '/src/assets/images' },
                { test: /\.(woff2?|svg|ttf|png)$/, use: 'file-loader', exclude: __dirname + '/src/assets/images' }
            ]
        },
        plugins: [htmlPlugin, scssPlugin]
    }]
};
