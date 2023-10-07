const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'index.bundle.js',
        publicPath: '/',
        assetModuleFilename: 'assets/img/[hash][ext][query]',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    targets: 'defaults',
                                    debug: true,
                                    useBuiltIns: 'usage',
                                    corejs: 3,
                                },
                            ],
                            [
                                '@babel/preset-react',
                                {
                                    runtime: 'automatic',
                                },
                            ]
                        ],
                    },
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset',
            },
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.join(__dirname, 'public', 'index.html'),
        }),
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    devServer: {
        static: true,
        port: 3000,
        hot: true,
        open: true,
        historyApiFallback: true,
        historyApiFallback: {
            disableDotRule: true,
        },
    },
};
