'use strict';
const vfs = require('vinyl-fs');
const ftp   = require('vinyl-ftp');
const _ = require('lodash');

module.exports = function(config) {
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
    .pipe(conn.dest(ftpConfig.dest));
};