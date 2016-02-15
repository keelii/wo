'use strict';
const UglifyJS = require('uglify-js');
const map = require('map-stream');

function minify(file, option, cb) {
    let content = String(file.contents);
    let result = { code: '' };

    try {
        result = UglifyJS.minify(content, { fromString: true });
    } catch (err) {
        console.error('Compress [%s] error.', file.path);
    }

    file.contents = new Buffer(result.code);

    cb(null, file);
}

module.exports = function(option) {
    return map(function(file, cb) {
        minify(file, option, cb);
    });
};