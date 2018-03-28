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
    const RE_URL_PREFIX = /^url\(('|")?/gi;
    const RE_URL_POSTFIX = /('|")?\)$/gi;

    if (!option.enabled) {
        return cb(null, file);
    }

    if (!matches || !matches.length) {
        return cb(null, file);
    }

    option.prefix = utils.dirToPath(option.prefix);

    let urls = [];

    _.uniq(_.map(matches, m => {
            return m.replace(RE_URL_PREFIX, '').replace(RE_URL_POSTFIX, '')
        }))
        .filter(match => {
            return !utils.isAbsUrl(match) && !utils.isDataUri(match) && !utils.isEmptyUrl(match);
        })
        .forEach((match) => {
            let relPath = '';

            // url(/path/to/file) => url(production/name/version/path/to/file)
            if (match.indexOf('/') === 0) {
                relPath = match.substr(1);
            } else {
                let absDir = path.resolve(dirname, match);
                relPath = utils.dirToPath(path.relative(option.base, absDir));
            }

            urls.push({
                path: match,
                production: `${option.prefix}/${relPath}`
            });
        });

    function escapeRegExp(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    urls.forEach(function (url) {
        let urlRE = new RegExp( escapeRegExp('(' + url.path + ')'), 'gi');

        content = content.replace(urlRE, '(' + url.production + ')');
    });

    file.contents = new Buffer(content);

    cb(null, file);
}

module.exports = function(option) {
    return map(function(file, cb) {
        rebase(file, option, cb);
    });
};
