const path = require('path');

export default {
    entry: 'src/index.js',
    extraBabelPlugins: [['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]],
    env: {
        // 开发环境
        development: {
            extraBabelPlugins: ['dva-hmr'],
            publicPath: '/',
        },
        // build 时的生产环境
        "production": {
            publicPath: 'http://39.108.86.241/home/',
        }
    },
    "outputPath": `./home/`,
    externals: {
        '@antv/data-set': 'DataSet',
        rollbar: 'rollbar',
    },
    alias: {
        components: path.resolve(__dirname, 'src/components/'),
    },
    ignoreMomentLocale: true,
    theme: './src/theme.js',
    html: {
        template: './src/index.ejs',
    },
    lessLoaderOptions: {
        javascriptEnabled: true,
    },
    proxy: {
        '/space': {
            // target: 'http://39.108.86.241:9201', // 测试环境服务器地址
            target: 'http://192.168.1.141:7001',
            changeOrigin: true,
            pathRewrite: { '^/space': '' },
        },
    },
    // true：关闭懒加载
    // false：懒加载每一个页面（打包时每个页面打包为一个 js 文件，进入该页面才会加载此 js 文件）
    disableDynamicImport: false,
    hash: true,
};
