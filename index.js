#!/usr/bin/env node
'use strict';
const argv = require('minimist')(process.argv.slice(2));
const cmd = argv._[0];
const chalk = require('chalk');
const utils = require('./lib/utils');
const pkg = require('./package');

const logo = `
┬ ┬╔═╗╔═╗╔═╗
│││║ ║║ ║║ ║
└┴┘╚═╝╚═╝╚═╝
-------${pkg.version}`;

const help = `
Usage: wo <command> <input> <options>

command:
  build     ${chalk.gray('- clear && build all source files to dest')}
  deploy    ${chalk.gray('- build && upload to ftp server')}
  release   ${chalk.gray('- build && taged git source')}
  start     ${chalk.gray('- build && start a local server with default root [.www]')}
  clear     ${chalk.gray('- by default, rm -rf build .www')}

input:
  path/to/dir
  glob/pattern/**
  path/to/file.ext

options:
  --sprite      ${chalk.gray('- concat sprites to one image and generate a style file')}
  --nunjucks    ${chalk.gray('- compile nunjucks to html')}
  --uglify      ${chalk.gray('- compress scripts')}
  --imagemin    ${chalk.gray('- optmize images')}
  --sass        ${chalk.gray('- compile sass to css')}
`;

if (argv.h) {
    return console.log(help);
}
if (argv.v) {
    return console.log(pkg.version);
}

if (cmd) {
    const settings = require('./default')(argv);
    const command = utils.cmdMap[cmd];

    if (command) {
        require(`./cli/${command}`)(settings);
    } else {
        console.log('Command [%s] not found.', cmd);
    }
} else {
    console.log(chalk.yellow(logo));
}