"use strict";
const fs = require("fs");
const path = require("path");
const assert = require("assert");

let argv = require('minimist')(process.argv.slice(2));
argv.config = path.join(__dirname, 'config.js');

const settings = require('../default')(argv);
const clear = require('../cli/clear');

describe('cli/clear', function() {
    it('should remove build/.www dir.', function (done) {
        clear(settings, function () {
            assert.equal(false, !!fs.exists(path.join(__dirname, '.www')));
            assert.equal(false, !!fs.exists(path.join(__dirname, 'build')));
            done();
        });
    });
});
