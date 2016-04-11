'use strict';
const exec = require('child_process').exec;
const chalk = require('chalk');
const async = require('async');

const utils   = require('../lib/utils');

function execute(cmd, callback) {
    exec(cmd, (error, stdout, stderr) => {
        if (error || stderr) {
            return callback(error || stderr);
        }

        callback(null, stdout);
    });
}

function release(config, callback) {
    const cmds = config.release.cmds;

    if (cmds.length) {
        execute(cmds.join(' && '), callback);
    } else {
        callback('no release cmds');
    }
}

module.exports = function(config, callback) {
    callback = callback || function() {};

    release(config, function (err, result) {
        if (err) {
            callback(err);
        } else {
            if (!config.nolog) {
                console.log(result);
            }
            callback(null, result);
        }
    });
};
module.exports.execute = execute;
