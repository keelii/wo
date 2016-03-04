'use strict';
const path = require('path');
const map = require('map-stream');
const utils = require('../lib/utils');

function banner(file, option, cb) {
    let content = String(file.contents);
    let basename = path.basename(file.path);

    if (!option.enabled || !option.template) {
        return cb(null, file);
    }

    var now = new Date();
    var timeStr = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    var bannerStr = option.template
            .replace(/\{\{\s+name\s+\}\}/g, basename)
            .replace(/\{\{\s+date\s+\}\}/g, timeStr);

    content = bannerStr + content + '\n';

    file.contents = new Buffer(content);
    cb(null, file);
}

module.exports = function(option) {
    return map(function(file, cb) {
        banner(file, option, cb);
    });
};