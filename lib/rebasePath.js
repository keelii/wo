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
            let item = match.replace(/url\(|\)|"|'/g, '');
            let relPath = '';

            // url(/path/to/file) => url(production/name/version/path/to/file)
            if (item.indexOf('/') === 0) {
                relPath = item.substr(1);
            } else {
                let absDir = path.resolve(dirname, item);
                relPath = utils.dirToPath(path.relative(option.base, absDir));
            }

            urls.push({
                path: item,
                production: `${option.prefix}/${relPath}`
            });
        }
    });

    function escapeRegExp(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    urls.forEach(function (url) {
        let urlRE = new RegExp( escapeRegExp('(' + url.path + ')'), 'gi');

        content = content.replace(urlRE, '(' + url.production.replace('//', '\/\/') + ')');
    });

    file.contents = new Buffer(content);

    cb(null, file);
}

module.exports = function(option) {
    return map(function(file, cb) {
        rebase(file, option, cb);
    });
};
