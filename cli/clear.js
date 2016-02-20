const rimraf = require('rimraf');
const async = require('async');

module.exports = function (config) {
    async.each([
        config.dest,
        config.server.dir
    ], rimraf, function (err) {
        if (err) return console.log(err);
        console.log('[DONE] clear.');
    });
};