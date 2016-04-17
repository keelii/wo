"use strict";
const fs = require("fs");
const path = require("path");
const assert = require("assert");
const fse = require('fs-extra');

const argv = require('minimist')(process.argv.slice(2));
argv.config = path.join(__dirname, 'config.js');

const build = require('../cli/build');

function readFile(filename) {
    let content = fs.readFileSync(filename, 'utf8');
    return content.replace(/^\s+|\s+$/g, '');
}

