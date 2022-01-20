import shebang from 'rollup-plugin-preserve-shebang';
export default {
    input: './src/app.js',
    output: {
        file: './bin/createPlugin.js',
        format: 'cjs'
    },
     plugins: [
        shebang()
    ]
}