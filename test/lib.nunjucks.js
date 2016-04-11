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

describe('lib/nunjucks', function () {
    argv.production = true;
    let settings = require('../default')(argv, __dirname);

    settings._arg.nunjucks = true;

    before((done) => build(settings, 'test/app/views/*.html', done));
    after(() => fse.removeSync('test/build'));

    function trimAll(str) {
        return str.replace(/\s+/g, '');
    }

    let templateDir = path.join(settings._DEST_ROOT, settings.view);

    it('should compile nunjucks extension inject', function() {
        assert.equal(
            '<html><head><title>Links</title></head><body>0</body></html>',
            trimAll(readFile(path.join(templateDir, 'inject.html')))
        );
    });
    it('should compile nunjucks file to development with component footer', function() {
        assert.equal(
            `<linktype="text/css"rel="stylesheet"href="//your.domain.com/cdn-path/project_name/0.0.0/components/footer/footer.css"/><h1><footer>footer</footer><i><linktype="text/css"rel="stylesheet"href="//your.domain.com/cdn-path/project_name/0.0.0/components/??/footer/footer.css"/></i><s><scriptsrc="//your.domain.com/cdn-path/project_name/0.0.0/components/??"></script></s><b>val</b></h1>`,
            trimAll(readFile(path.join(templateDir, 'test.component.html')))
        );
    });
});
