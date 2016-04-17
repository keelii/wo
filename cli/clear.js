const fse = require('fs-extra');
const async = require('async');

module.exports = function (config, callback) {
    callback = callback || function() {};

    async.each([
        config._DEST_ROOT,
        config._SERVER_ROOT
    ], fse.remove, function (err) {
        if (err) {
            return callback(err);
        }
        if (!config.nolog) {
            console.log('Project directory clean.');
        }
        callback(null);
    });
};
