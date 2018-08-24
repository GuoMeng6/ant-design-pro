const path = require('path');

export default {
    entry: 'src/index.js',
    extraBabelPlugins: [['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]],
    env: {
        development: {
            extraBabelPlugins: ['dva-hmr'],
        },
    },
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
            // target: 'http://39.108.86.241:9201', //prot
            target: 'http://192.168.1.141:7001', //胡立伟
            // target: 'http://192.168.1.227:7001', //一行
            changeOrigin: true,
            pathRewrite: { '^/space': '' },
        },
    },
    disableDynamicImport: false, //true 默认关掉了动态加载
    publicPath: '/',
    // publicPath: 'http://39.108.86.241/home/',
    hash: true,
};
