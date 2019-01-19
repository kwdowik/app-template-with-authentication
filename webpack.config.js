const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

const htmlPlugin = new HtmlWebPackPlugin({
    template: "./public/index.html",
    filename: "./index.html"
});

module.exports = (env = {}) => {
    const isDevBuild = !env.production;
    console.info(`Using environemnt: ${env}`);

    return [{
        mode: isDevBuild ? 'development' : 'production',
        entry: './src/index.tsx',
        resolve: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
        output: {
            path: path.join(__dirname, '/dist'),
            filename: '[name].js',
        },
        module: {
            rules: [
                { test: /\.tsx?$/, loader: 'tslint-loader', enforce: 'pre', options: { emitErrors: isDevBuild } },
                { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
                { test: /\.tsx?$/, use: 'ts-loader?silent=true' },
                {
                    test: /\.scss$/,
                    test: /\.s?css$/,
                    use: [
                        isDevBuild
                            ? 'style-loader'
                            : MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader',
                      ],
                },
                { test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=25000', include: __dirname + '/src/assets/images' },
                { test: /\.(woff2?|svg|ttf|png)$/, use: 'file-loader', exclude: __dirname + '/src/assets/images' }
            ]
        },
        plugins: [htmlPlugin]
    }]
};
