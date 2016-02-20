#!/usr/bin/env node
'use strict';
const argv = require('minimist')(process.argv.slice(2));
const cmd = argv._[0];
const utils = require('./lib/utils');

if (cmd) {
    const settings = require('./default')(argv);
    const command = utils.cmdMap[cmd];

    if (command) {
        // try {
            require(`./cli/${command}`)(settings);
        // } catch (error) {
        //     console.log('Module [%s] loaded error.', cmdMap[cmd]);
        //     console.error(error);
        // }
    } else {
        console.log('Command [%s] not found.', cmd);
    }
}