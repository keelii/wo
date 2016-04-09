'use strict';
const path = require('path');
const map = require('map-stream');
const _    = require('lodash');
const utils = require('../lib/utils');

function rebase(file, option, cb) {
    let content = String(file.contents);
    const dirname = path.dirname(file.path);

    // 匹配所有的url(...)
    const RE_URL = /url\s*\(\s*(['"]?)([^"'\)]*)\1\s*\)/gi;
    const matches = content.match(RE_URL);

    if (!option.enabled) {
        return cb(null, file);
    }

    if (!matches || !matches.length) {
        return cb(null, file);
    }

    option.prefix = utils.dirToPath(option.prefix);

    let urls = [];
    _.uniq(matches).forEach((match) => {
        if (!utils.isAbsUrl(match) && !utils.isDataUri(match)) {
            // 去掉多余字符如：url(,),",'
            let items = match.replace(/url\(|\)|"|'/g, '');

            let absDir = path.resolve(dirname, items);
            let relPath = utils.dirToPath(path.relative(option.base, absDir));

            urls.push({
                path: items,
                production: `${option.prefix}/${relPath}`
            });
        }
    });

    urls.forEach(function (url) {
        let urlRE = new RegExp(url.path, 'gi');
        content = content.replace(urlRE, url.production);
    });

    file.contents = new Buffer(content);

    cb(null, file);
}

module.exports = function(option) {
    return map(function(file, cb) {
        rebase(file, option, cb);
    });
};
