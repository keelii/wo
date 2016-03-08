'use strict';
const chokidar = require('chokidar');
const shs = require('static-http-server');
const build = require('./build');

const async = require('async');
const _ = require('lodash');
const utils = require('../lib/utils');

function log(e, rPath) {
    console.log('[%s] => %s', e.toUpperCase(), utils.relativeDir(rPath));
}

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

    var targets = _.concat();

    config.watcher = chokidar.watch(config._SOURCE_ROOT, {
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
function watchRefs(config) {
    var result = _.transform(config._sass, (result, values, key) => {
        values.forEach(function (value) {
            if (!result[value]) {
                result[value] = [];
            }

            result[value].push(key);
        });
    });

    function watch(tar, des) {
        config.watcher.unwatch(tar);
        chokidar.watch(tar, {
            ignored: config.watchIgnore,
            ignoreInitial: true
        }).on('all', (event, path) => {
            log(event, path);
            build(config, des.concat(tar));
        });
    }

    for ( var key in result ) {
        if ( result.hasOwnProperty(key) ) {
            watch(key, result[key]);
        }
    }
}

module.exports = function(config, callback) {
    callback = callback || function() {};

    async.series([
        cb => build(config, null, cb),
        cb => server(config, cb),
        cb => watch(config, cb)
    ], function (err) {
        if (err) {
            console.error(err);
        }

        watchRefs(config);
        callback();
    });
};
