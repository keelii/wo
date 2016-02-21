'use strict';
const chokidar = require('chokidar');
const shs = require('static-http-server');
const build = require('./build');

const async = require('async');
const utils = require('../lib/utils');

function server(config, callback) {
    callback = callback || function() {};

    shs(config._SERVER_ROOT, {
        nolog: config.nolog,
        index: config.server.index,
        port: config.server.port
    }, callback);
}

function watch(config, callback){
    callback = callback || function() {};

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

    callback(null);
}

module.exports = function(config, callback) {
    callback = callback || function() {};

    async.series([
        cb => build(config, null, cb),
        cb => server(config, cb),
        cb => watch(config, cb)
    ], callback);
};
