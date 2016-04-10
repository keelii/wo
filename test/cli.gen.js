'use strict';

const fs = require("fs");
const fse = require('fs-extra');
const path = require("path");
const assert = require("assert");
const gen = require('../cli/gen');

let argv = require('minimist')(process.argv.slice(2));
let settings = require('../default')(argv, __dirname);

describe('cli/gen', function () {
    var cwd = process.cwd();

    it('should generate a new project named project.', function (done) {
        gen(settings, null, function () {
            assert.equal(true, fs.existsSync(path.join(process.cwd(), 'project')));
            done();
        });
    });

    it('should generate a new project named project_name.', function (done) {
        gen(settings, 'project_name', function () {
            assert.equal(true, fs.existsSync(path.join(process.cwd(), 'project_name')));
            done();
        });
    });

    it('should throw an error while generating project', function (done) {
        gen(settings, '*()_+', function (err) {
            assert.equal(err[0].code, 'ENOENT');
            done();
        });
    });

    it('should gen a new project with bare dir', function (done) {
        fs.mkdirSync(path.join(cwd, 'test/test_bare'));
        process.chdir('test/test_bare');

        let argv = require('minimist')(process.argv.slice(2));
        let settings = require('../default')(argv, path.join(cwd, 'test'));

        settings._arg.currdir = true;

        gen(settings, '', function (err) {
            assert.equal(true,
                fs.existsSync(path.join(cwd, 'test/test_bare/config.js')));
            process.chdir(cwd);
            done();
        });
    });

    after(function () {
        fse.removeSync('project');
        fse.removeSync('project_name');
        fse.removeSync('test/test_bare');
    });
});

