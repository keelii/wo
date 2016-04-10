'use strict';
const fs = require("fs");
const fse = require('fs-extra');
const path = require("path");
const assert = require("assert");

const argv = require('minimist')(process.argv.slice(2));
const settings = require('../default')(argv, __dirname);
const release = require('../cli/release');
const utils = require('../lib/utils');

describe('cli/release', function () {
    it('should get tag list', function (done) {
        release.getTag('git tag', function (err, tagname) {
            assert.equal(utils.getTagName(), tagname);
            done();
        });
    });
});
