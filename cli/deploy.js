'use strict';
const vfs = require('vinyl-fs');
const map = require('map-stream');
const ftp   = require('vinyl-ftp');
const build   = require('./build');

const _ = require('lodash');

function deploy(config, callback) {
    callback = callback || function() {};

    let ftpConfig = _.defaults({
        log: function (type, file) {
            if (/UP/.test(type)) {
                return console.log.call(type, file);
            }
        }
    }, config.deploy);

    let conn = ftp.create(ftpConfig);

    function cached(enabled) {
        return enabled ? conn.newer(ftpConfig.dest) : map(function(file, cb) {
            cb(null, file);
        });
    }

    vfs.src(ftpConfig.src, {
        base: config.dest,
        buffer: false
    })
    .pipe(cached(!config._isForce))
    .pipe(conn.dest(ftpConfig.dest))
    .on('end', callback);
}

module.exports = function(config, input) {
    input = input || config._arg._[1];

    console.log('Building sources\n...');
    build(config, input, function() {
        console.log('Build done. deploying to server\n...');
        deploy(config, function() {
            console.log('Deploy done.');
        });
    });
};
