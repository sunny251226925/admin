const { injectBabelPlugin } = require('react-app-rewired');
const uglify = require('uglifyjs-webpack-plugin');

module.exports = function override(config, env) {
       config = injectBabelPlugin(
             ['import',
                 {
                     libraryName: 'antd',
                     libraryDirectory: 'es',
                     style: 'css'
                 }
             ],
            config,
         );
        // config.devtool = false;
        // config.plugins.push(new uglify());
    return config;
};