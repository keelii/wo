'use strict';
const path = require('path');
const map = require('map-stream');
const CleanCSS = require('clean-css');
const _    = require('lodash');
const utils = require('../lib/utils');

function cleanCSS(file, option, cb) {
    let content = String(file.contents);
    let defaults = {
        compatibility: 'ie7'
    };

    if (!option.enabled) {
        return cb(null, file);
    }

    new CleanCSS(_.defaultsDeep(option, defaults)).minify(content, function (err, result) {
        if (err) {
            return cb(err);
        }

        file.contents = new Buffer(result.styles);
        cb(null, file);
    });
}

module.exports = function(option) {
    return map(function(file, cb) {
        cleanCSS(file, option, cb);
    });
};
