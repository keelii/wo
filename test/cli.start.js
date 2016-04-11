'use strict';

const fs = require("fs");
const http = require("http");
const fse = require('fs-extra');
const path = require("path");
const assert = require("assert");

const argv = require('minimist')(process.argv.slice(2));
argv.development = true;
const settings = require('../default')(argv, __dirname, true);
const start = require('../cli/start');

function trimAll(str) {
    return str.replace(/\s+/g, '');
}

describe('cli/start - exception', function() {
    it('should return not validate input', function (done) {
        start(settings, 'test/app/components/main/not.validate.file', function (err) {
            assert.equal(err, 'input not validated');
            done();
        });
    });

    after(() => fse.removeSync('test/.www'));
});

describe('cli/start', function() {
    before((done) => start(settings, null, () => setTimeout(done, 500)));
    afterEach(function () {
        fs.writeFileSync(jsSourceFile, jsContent, 'utf8');
        fs.writeFileSync(cssSourceFile, cssContent, 'utf8');
        fs.writeFileSync(htmlSourceFile, htmlContent, 'utf8');
        fs.writeFileSync(macoSourceFile, macoContent, 'utf8');
        fs.writeFileSync(mixinSourceFile, mixinContent, 'utf8');
    });
    after(() => fse.removeSync('test/build'));

    let jsSourceFile = path.join(settings._COMPONENT_ROOT, 'main/main.js');
    let jsDestFile = path.join(settings._DEST_ROOT, 'components/main/main.js');
    let jsContent = fs.readFileSync(jsSourceFile).toString();

    it('should trigger script file change event', function (done) {
        fs.writeFileSync(jsSourceFile, jsContent + ';', 'utf8');

        setTimeout(function() {
            let jsChangedContent = fs.readFileSync(jsDestFile).toString();

            assert.equal(
                `(function(w){w.location.href='//jd.com';})(window);;`,
                trimAll(jsChangedContent)
            );
            done();
        }, 500);
    });

    let cssSourceFile = path.join(settings._COMPONENT_ROOT, 'main/main.scss');
    let cssDestFile = path.join(settings._DEST_ROOT, 'components/main/main.css');
    let cssContent = fs.readFileSync(cssSourceFile).toString();

    it('should trigger script file change event', function (done) {
        fs.writeFileSync(cssSourceFile, cssContent + 'i{text-align:center;}', 'utf8');

        setTimeout(function() {
            let cssChangedContent = fs.readFileSync(cssDestFile).toString();

            assert.equal(
                `/*icons*/.iconsi{display:inline-block;}i{text-align:center;}`,
                trimAll(cssChangedContent)
            );
            done();
        }, 500);
    });

    let htmlSourceFile = path.join(settings._VIEW_ROOT, 'index.html');
    let htmlDestFile = path.join(settings._DEST_ROOT, 'views/index.html');
    let htmlContent = fs.readFileSync(htmlSourceFile).toString();

    it('should trigger nunjucks file change event', function (done) {
        fs.writeFileSync(htmlSourceFile, htmlContent + '<b></b>', 'utf8');

        setTimeout(function() {
            let htmlChangedContent = fs.readFileSync(htmlDestFile).toString();

            assert.equal(
                `<h1>3</h1><b></b>`,
                trimAll(htmlChangedContent)
            );
            done();
        }, 500);
    });


    let macoSourceFile = path.join(settings._VIEW_ROOT, 'maco/default.html');
    let macoDestFile = path.join(settings._DEST_ROOT, 'views/index.html');
    let macoContent = fs.readFileSync(macoSourceFile).toString();

    it('should trigger nunjucks maco file change event', function (done) {
        fs.writeFileSync(macoSourceFile, macoContent + '{%%}', 'utf8');

        setTimeout(function() {
            let macoChangedContent = fs.readFileSync(macoDestFile).toString();

            assert.equal(
                `<h1>3</h1>`,
                trimAll(macoChangedContent)
            );
            done();
        }, 500);
    });

    let mixinSourceFile = path.join(settings._COMPONENT_ROOT, 'main/mixin/border.scss');
    let mixinDestFile = path.join(settings._DEST_ROOT, 'components/main/main.css');
    let mixinContent = fs.readFileSync(mixinSourceFile).toString();

    it('should trigger sass mixin file change event', function (done) {
        fs.writeFileSync(mixinSourceFile, mixinContent + 'i{text-align:center;}', 'utf8');

        setTimeout(function() {
            let mixinChangedContent = fs.readFileSync(mixinDestFile).toString();

            assert.equal(
                `/*icons*/i{text-align:center;}.iconsi{display:inline-block;}`,
                trimAll(mixinChangedContent)
            );
            done();
        }, 500);
    });

    it('should start a local http server.', function (done) {
        http.get('http://localhost:2048/', (res) => {
            assert.equal(200, res.statusCode);
            done();
        }).on('error', (e) => {
            throw new Error(e);
        });
    });
});
