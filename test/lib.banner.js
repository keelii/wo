"use strict";
const fs = require("fs");
const path = require("path");
const assert = require("assert");
const fse = require('fs-extra');

const argv = require('minimist')(process.argv.slice(2));
const utils = require('../lib/utils');

const build = require('../cli/build');

function readFile(filename) {
    let content = fs.readFileSync(filename, 'utf8');
    return content.replace(/^\s+|\s+$/g, '');
}

describe('lib/banner', function () {
    argv.production = true;
    let settings = require('../default')(argv, __dirname);
    settings.banner = '/*banner you want*/';

    before((done) => build(settings, null, done));
    after(() => fse.removeSync('test/build'));

    let sourceDir = path.join(settings._DEST_ROOT, settings.component.dir);

    it('should compress javascript file to production targets with banner', function() {
        assert.equal(
            '/*banner you want*/!function(o){o.location.href="//jd.com"}(window);',
            readFile(path.join(sourceDir, 'main/main.js'))
        );
    });
    it('should compile & compress sass file to production targets with banner', function() {
        assert.equal(
            '/*banner you want*/.icons i{display:inline-block}',
            readFile(path.join(sourceDir, 'main/main.css'))
        );
    });
});


