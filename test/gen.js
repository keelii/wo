'use strict';

const fs = require("fs");
const fse = require('fs-extra');
const path = require("path");
const assert = require("assert");
const gen = require('../cli/gen');

let argv = require('minimist')(process.argv.slice(2));
argv.config = path.join(__dirname, 'config.js');
let settings = require('../default')(argv);

describe('cli/gen', function () {
    let cwd = process.cwd();

    after(function () {
        settings._arg.currdir = false;
        process.chdir(cwd);

        fse.removeSync('project');
        fse.removeSync('project_name');
        fse.removeSync('test_bare');
    });

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
        let res = '../../../../../../../../../../../../../../../~!@#$%^&*()';
        gen(settings, res, function (err) {
            assert.equal(false, fs.existsSync(path.join(process.cwd(), res)));
            done();
        });
    });

    it('should gen a new project with bare dir', function (done) {
        fs.mkdirSync('test_bare');
        process.chdir('test_bare');

        settings._arg.currdir = true;

        gen(settings, '', function (err) {
            assert.equal(true, fs.existsSync('config.js'));
            done();
        });
    });
});

