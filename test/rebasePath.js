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

function trimAll(str) {
    return str.replace(/\s+/g, '');
}

const source = 'app/components/footer/footer.rebasePath.scss';

describe('lib/rebasePath - development', function () {
    argv.development = true;
    argv.production = false;

    let settings = require('../default')(argv);

    before((done) => build(settings, source, done));
    after(() => fse.removeSync('.www'));

    let sourceDir = path.join(settings._DEST_ROOT, settings.component.dir);

    it('should compile sass and not rebase path ref', function() {
        assert.equal(
            `#foo{background:url(../main/i/bg.png);background:url(../main/i/bg.png);}#fooi{background:url(/component/main/i/bg.png);}#foob{background:url(//main/i/bg.png);}`,
            trimAll(readFile(path.join(sourceDir, 'footer/footer.rebasePath.css')))
        );
    });
});

describe('lib/rebasePath - production', function () {
    argv.development = false;
    argv.production = true;

    let settings = require('../default')(argv);

    before((done) => build(settings, source, done));
    after(() => fse.removeSync('build'));

    let sourceDir = path.join(settings._DEST_ROOT, settings.component.dir);

    it('should compile sass and rebase path ref', function() {
        assert.equal(
            `#foo{background:url(//your.domain.com/cdn-path/project_name/0.0.0/components/main/i/bg.png)}#fooi{background:url(//your.domain.com/cdn-path/project_name/0.0.0/component/main/i/bg.png)}#foob{background:url(//main/i/bg.png)}`,
            trimAll(readFile(path.join(sourceDir, 'footer/footer.rebasePath.css')))
        );
    });
});
