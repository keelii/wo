'use strict';
const path = require('path');
const map = require('map-stream');
const nunjucks = require('nunjucks');
const utils = require('./utils');
const _ = require('lodash');

/**
 * Parse custom  component tag's reference
 *   _components: {
 *      "abspath/to/template/file.html": {
 *          "path/to/c2": { name: 'c2', path: ""},
 *          "path/to/c1": { name: 'c1', path: ""}
 *      }
 *   }
 */
function parseReference(file, config, cb) {
    let content = String(file.contents);
    let RE_COMPONENT = /\{\%\scomponent\s([^%]+)\%\}/g;

    let results = content.match(RE_COMPONENT) || [];

    function getName(str) {
        return str.replace(/\{\%\scomponent\s/g, '')
            .replace(/\%\}/g, '')
            .replace(/\s/g, '')
            .replace(/'/g, '')
            .replace(/"/g, '').trim();
    }

    config._components[file.path] = {};

    results.forEach(function (r) {
        let name = getName(r.split(',')[0]);
        let cPath = `components/${name}/${name}`;

        if (!config._components[file.path][cPath]) {
            config._components[file.path][cPath] = {
                name: name,
                path: cPath
            };
        }
    });

    cb(null, file);
}

module.exports = function(option) {
    return map(function(file, cb) {
        // Parse component reference
        parseReference(file, option, cb);
    });
};
