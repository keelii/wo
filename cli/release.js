'use strict';
const exec = require('child_process').exec;
const chalk = require('chalk');
const async = require('async');

const utils   = require('../lib/utils');

function getMessage(msg, callback) {
    console.log(chalk.yellow('\nRelease Tag Message\n---------------'));
    utils.ask(chalk.gray(msg[0]), function (title) {
        utils.ask(chalk.gray(msg[1]), function (desc) {
            callback([title, desc]);
            process.stdin.emit('end');
        });
    });
}

function execute(cmd, callback) {
    exec(cmd, (error, stdout, stderr) => {
        if (error) {
            return callback(error);
        }
        if (stderr) {
            return callback(stderr);
        }
        if (stdout) {
            console.log(stdout);
        }

        callback(null, stdout);
    });
}

function getTag(cmd, callback) {
    exec(cmd, (error, stdout, stderr) => {
        if (error) {
            return callback(error);
        }
        if (stderr) {
            return callback(stderr);
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
        function(tagname, cb) {
            getMessage(['Title', 'Description'], function (msg) {
                cb(null, tagname, msg);
            });
        },
        function (tagname, msg, cb) {
            var res = config.release;
            let cmds = [];

            if (res.before) {
                cmds.push(res.before);
            }

            cmds.push(`git tag ${tagname} -m "${msg.join(',')}"`);

            if (res.after) {
                cmds.push(res.after);
            }

            execute(cmds.join(' && '), function (err, res) {
                if (err) {
                    cb(err);
                } else {
                    cb(null, tagname);
                }
            });
        }
    ], callback);
}

module.exports = function(config, input, callback) {
    callback = callback || function() {};

    release(config, function (err, result) {
        if (err) {
            console.error(err);
        } else {
            if (!config.nolog) {
                console.log(`Release a new tag [${chalk.green(result)}]`);
            }
            callback(null, 'result');
        }
    });
};
module.exports.getTag = getTag;
