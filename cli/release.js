'use strict';
const vfs = require('vinyl-fs');
const exec = require('child_process').exec;
const chalk = require('chalk');
const async = require('async');
const build   = require('./build');
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

function pushTag(cmd, callback) {
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

function getTags(cmd, callback) {
    function getTagName() {
        var now = new Date();
        return `RELEASE/${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}/${now.getHours()}-${now.getMinutes()}`;
    }

    exec(cmd, (error, stdout, stderr) => {
        if (error) {
            return callback(error);
        }
        if (stderr) {
            return callback(stderr);
        }

        var tags = stdout.trim().split(/\s/);
        var tagName = getTagName();

        if (tags.indexOf(tagName) > -1) {
            callback(`Release Tag ${tagName} already exists.`);
        } else {
            callback(null, getTagName());
        }
    });
}

function removeTag(tagname, callback) {
    exec(`git tag -d ${tagname}`, (error, stdout, stderr) => {
        if (error) {
            return callback(error);
        }
        if (stderr) {
            return callback(stderr);
        }

        callback(null, 'success');
    });
}

function release(config, callback) {
    // TODO
    var cmds = config.release.cmds;

    async.waterfall([
        function(cb) {
            getTags('git tag', cb);
        },
        function(tagname, cb) {
            getMessage(['Title', 'Description'], function (msg) {
                cb(null, tagname, msg);
            });
        },
        function (tagname, msg, cb) {
            var cmds = config.release.cmds.concat([
                `git tag ${tagname} -m "${msg.join(',')}"`,
                `git pull origin master`,
                `git push origin master --tag`
            ]);
            pushTag(cmds.join(' && '), cb);
        }
    ], callback);
}

module.exports = function(config, input, callback) {
    //input = input || config._arg._[1];
    callback = callback || function() {};

    console.log('Building sources\n...');
    build(config, input, function() {
        console.log('Build done. \nReleasing new version to repo\n...');
        release(config, function (err, result) {
            if (err) {
                console.error(err);
            } else {
                console.log('All done.');
                callback(null, 'result');
            }
        });
    });
};
