'use strict';
const path = require("path");
const assert = require("assert");

const release = require('../cli/release');

const argv = require('minimist')(process.argv.slice(2));
argv.config = path.join(__dirname, 'config.js');

describe('cli/release - ok', function () {
    let settings = require('../default')(argv);

    it('should get directory list', function (done) {
        release(settings, function (err, result) {
            let files = result.split(/\s/);

            assert.equal(true, files.indexOf('config.js') > -1);
            done();
        });
    });
    it('should get empty cmds', function (done) {
        settings.release.cmds = [];

        release(settings, function (err) {
            assert.equal(err, 'no release cmds');
            done();
        });
    });
});
describe('cli/release - error', function () {
    let settings = require('../default')(argv);

    settings.release.cmds = ['not_found_command'];

    it('should return a command not found', function (done) {

        release(settings, function (err) {
            assert.equal(true, !!err);
            done();
        });
    });
});
