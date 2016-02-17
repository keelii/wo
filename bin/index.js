'use strict';
const argv = require('minimist')(process.argv.slice(2));
const cmd = argv._[0];
const cmdMap = {
     "s":"start",   "start":"start",
     "b":"build",   "build":"build",
     "d":"deploy",  "deploy":"deploy",
     "r":"release", "release":"release",
     "c":"clear",   "clear":"clear"
};

if (cmd) {
    const settings = require(process.cwd() + '/default')(argv);

    if (cmdMap[cmd]) {
        // try {
            require(`../cli/${cmdMap[cmd]}`)(settings);
        // } catch (error) {
        //     console.log('Module [%s] loaded error.', cmdMap[cmd]);
        //     console.error(error);
        // }
    } else {
        console.log('Command [%s] not found.', cmd);
    }
}