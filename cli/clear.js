const fse = require('fs-extra');
const async = require('async');

module.exports = function (config, callback) {
    async.each([
        config.dest,
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
