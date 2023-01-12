var path = require('path');

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
    devtool: 'source-map'
};