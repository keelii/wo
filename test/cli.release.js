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

describe('cli/release', function () {
    let tag = null;
    var hasGit = true;
    before(function (done) {
        release(settings, function (err, res) {
            if (err) {
                hasGit = false;
                done();
                return release.execute(`git tag -d ${tag}`, () => {});
            }
            tag = res;
            done(err);
        });
    });
    after(function (done) {
        if (hasGit) {
            release.execute(`git tag -d ${tag}`, function (err) {
                done(err);
            });
        } else {
            done();
        }
    });

    it('should release a tag', function () {
        if (hasGit) {
            assert.equal(
                tag,
                utils.getTagName()
            );
        } else {
            assert.equal(null, tag);
        }
    });
    it('should execute false', function (done) {
        release.execute(`gitabc tag -d`, function (err) {
            assert.equal(true, !!err);
            done();
        });
    })
});
