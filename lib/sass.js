'use strict';
const path = require('path');
const Sass = require('node-sass');
const map = require('map-stream');
const _ = require('lodash');
const utils = require('./utils');

function sass(file, option, cb) {
    let content = String(file.contents);
    var dirname = path.dirname(file.path);
    let config = option.config;
    let result = { css: '' };

    // 如果文件为空(@mixin...)直接返回，避免sass解析报错
    if ( !content ) {
        return cb(null, file);
    }

    try {
        result = Sass.renderSync({
            data: content,
            includePaths: [dirname],
            outputStyle: option.debug ? 'nested' : 'compressed'
        });

        if (result.stats.includedFiles.length) {
            config._sass[file.path] = result.stats.includedFiles;
        }

        file.path = file.path.replace(/\.scss$/, '.css');
        file.contents = result.css;
    } catch (error) {
        console.log('Sass render error. [%s]', file.path);
        console.error(error);
    }

    cb(null, file);
}

module.exports = function(option) {
    return map(function(file, cb) {
        sass(file, option, cb);
    });
};
