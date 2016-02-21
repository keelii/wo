const rimraf = require('rimraf');
const async = require('async');

module.exports = function (config, callback) {
    callback = callback || function() {};

    async.each([
        config._DEST_ROOT,
        config._SERVER_ROOT
    ], rimraf, callback);
};