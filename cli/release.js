'use strict';
const vfs = require('vinyl-fs');
const exec = require('child_process').exec;
const build   = require('./build');
const _ = require('lodash');

function release(config, callback) {
    // TODO
    var cmd = config.release;

}

module.exports = function(config, input) {
    input = input || config._arg._[1];

    console.log('Building sources\n...');
    build(config, input, function() {
        console.log('Build done. \nReleasing new version to repo\n...');
        release(config, function() {
            console.log('Release done.');
        });
    });
};