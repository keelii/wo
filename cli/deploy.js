'use strict';
const vfs = require('vinyl-fs');
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

    vfs.src(ftpConfig.src, {
        base: config._DEST_ROOT,
        buffer: false
    })
    .pipe(conn.newer(ftpConfig.dest))
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