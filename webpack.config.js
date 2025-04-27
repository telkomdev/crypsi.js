var path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: './index.ts',
    module: {
        rules: [
            {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'crypsi.min.js',
        library: 'crypsi'
    },
    devtool: 'source-map',
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
};