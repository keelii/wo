const fs = require("fs");
const fse = require('fs-extra');
const path = require("path");
const assert = require("assert");

const argv = require('minimist')(process.argv.slice(2));
const settings = require('../default')(argv, __dirname, true);
const gen = require('../cli/gen');

describe('cli/gen - default', function () {
    before(function (done) {
        gen(settings, null, done);
    });

    it('should generate a new project named project.', function () {
        assert.equal(true, fs.existsSync(path.join(process.cwd(), 'project')));
    });

    after(function () {
        fse.removeSync('project');
    });
});

describe('cli/gen - specified project name', function () {
    before(function (done) {
        gen(settings, 'project_name', done);
    });

    it('should generate a new project named project_name.', function () {
        assert.equal(true, fs.existsSync(path.join(process.cwd(), 'project_name')));
    });

    after(function () {
        fse.removeSync('project_name');
    });
});
