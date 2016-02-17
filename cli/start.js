'use strict';
const chokidar = require('chokidar');
const shs = require('static-http-server');
const build = require('./build');
const utils = require('../lib/utils');

function server(config) {
    shs(config.server.dir, {
        index: config.server.index,
        port: config.server.port
    });
}

function watch(config){
    function log(e, rPath) {
        console.log('[%s] => %s', e.toUpperCase(), utils.relativeDir(rPath));
    }
    chokidar.watch(config._SOURCE_ROOT, {
        ignored: config.watchIgnore,
        ignoreInitial: true
    }).on('all', (event, path) => {
        log(event, path);
        build(config, path);
    });

    chokidar.watch(config.templateRefs, {
        ignoreInitial: true
    }).on('all', (event, path) => {
        log(event, path);
        build(config, config.templates[0]);
    });
}

module.exports = function(config) {
    build(config);
    server(config);
    watch(config);
};