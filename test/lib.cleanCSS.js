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

describe('lib/cleanCSS', function () {
    argv.development = false;
    argv.production = true;
    let settings = require('../default')(argv);

    before((done) => build(settings, null, done));
    after(() => fse.removeSync('build'));

    let sourceDir = path.join(settings._DEST_ROOT, settings.component.dir);

    it('should compile sass and clean file to production', function() {
        assert.equal(
            '.footer{background:#fff}',
            readFile(path.join(sourceDir, 'footer/footer.css'))
        );
    });
});
