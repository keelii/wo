'use strict';
const vfs = require('vinyl-fs');
const exec = require('child_process').exec;
//const build   = require('./build');
//const _ = require('lodash');

function release(config, callback) {
    // TODO
    var cmds = config.release.cmds;

    //console.log('[%s]', cmds.join(' && '));
    const child = exec(cmds.join(' && '), (error, stdout, stderr) => {

        console.log(`stdout:\n ${stdout}`);
        console.log(`stderr:\n ${stderr}`);
        if (error !== null) {
            console.log(`exec error: ${error}`);
        }
    });
}

module.exports = function(config, input) {
    //input = input || config._arg._[1];

    return 'to be done.';
    //console.log('Building sources\n...');
    //build(config, input, function() {
    //    console.log('Build done. \nReleasing new version to repo\n...');
        release(config, function() {
            //console.log('Release done.');
        });
    //});
};
