const path = require('path');
const { updateConfig } = require('react-app-rewire-antd-theme');

const options = {
    stylesDir: path.join(__dirname, './src/styles'),
    antDir: path.join(__dirname, './node_modules/antd'),
    varFile: path.join(__dirname, './src/styles/variables.less'),
    mainLessFile: path.join(__dirname, './src/styles/index.less'),
    themeVariables: ['@primary-color', '@text-color'],
    indexFileName: 'index.html',
    generateOnce: false,
    publicPath: '' // e.g. in case you are hosting at gh-pages `https://username.github.io/project` then you can add `/project` here
}
module.exports = function override(config, env) {
    config = updateConfig(config, env, options)
    return config;
};