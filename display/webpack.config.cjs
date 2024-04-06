const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        category: Path.resolve(__dirname, "src", "category.js"),
        question: Path.resolve(__dirname, "src", "question.js"),
    },
    target: 'electron-renderer',
    output: {
        path: Path.resolve(__dirname, 'build'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /.(jsx?)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            chunks: ['category'],
            filename: 'category.html'
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            chunks: ['question'],
            filename: 'question.html'
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            chunks: [],
            filename: 'index.html'
        })
    ]
}