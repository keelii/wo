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
    let tag = null;
    before(function (done) {
        release(settings, function (err, res) {
            if (err) {
                return release.execute(`git tag -d ${tag}`);
            }
            tag = res;
            done(err);
        });
    });
    after(function (done) {
        release.execute(`git tag -d ${tag}`, function (err) {
            done(err);
        });
    });

    it('should release a tag', function () {
        assert.equal(
            tag,
            utils.getTagName()
        );
    })
});
