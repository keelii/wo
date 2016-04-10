'use strict';
const exec = require('child_process').exec;
const chalk = require('chalk');
const async = require('async');

const utils   = require('../lib/utils');

function execute(cmd, callback) {
    exec(cmd, (error, stdout, stderr) => {
        if (error) {
            return callback(error);
        }

        callback(null, stdout);
    });
}

function getTag(cmd, callback) {
    exec(cmd, (error, stdout, stderr) => {
        if (error) {
            return callback(error);
        }

        let tags = stdout.trim().split(/\s/);
        let tagName = utils.getTagName();

        if (tags.indexOf(tagName) > -1) {
            callback(`Release Tag ${tagName} already exists.`);
        } else {
            callback(null, tagName);
        }
    });
}

function release(config, callback) {
    async.waterfall([
        function(cb) {
            getTag('git tag', cb);
        },
        function (tagname, cb) {
            var res = config.release;
            let cmds = [];

            if (res.before) {
                cmds.push(res.before);
            }

            cmds.push(`git tag ${tagname} -m "${config._MSG}"`);

            if (res.after) {
                cmds.push(res.after);
            }

            execute(cmds.join(' && '), function (err, res) {
                if (err) {
                    cb(err, tagname);
                } else {
                    cb(null, tagname);
                }
            });
        }
    ], callback);
}

module.exports = function(config, callback) {
    callback = callback || function() {};

    release(config, function (err, result) {
        if (err) {
            callback(err);
        } else {
            if (!config.nolog) {
                console.log(`Release a new tag [${chalk.green(result)}]`);
            }
            callback(null, result);
        }
    });
};
module.exports.getTag = getTag;
module.exports.execute = execute;
