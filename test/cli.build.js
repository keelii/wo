"use strict";
const fs = require("fs");
const path = require("path");
const assert = require("assert");
const fse = require('fs-extra');

const utils = require('../lib/utils');
const build = require('../cli/build');

let argv = require('minimist')(process.argv.slice(2));

function readFile(filename) {
    let content = fs.readFileSync(filename, 'utf8');
    return content.replace(/^\s+|\s+$/g, '');
}

function trimAll(str) {
    return str.replace(/\s+/g, '');
}

describe('cli/build - no input', function () {
    argv.production = true;
    let settings = require('../default')(argv, __dirname);

    before((done) => build(settings, null, done));
    after(() => fse.removeSync('test/build'));

    let sourceDir = path.join(settings._DEST_ROOT, settings.component.dir);

    it('should compress javascript file to production targets', function() {
        assert.equal(
            '!function(o){o.location.href="//jd.com"}(window);',
            readFile(path.join(sourceDir, 'main/main.js'))
        );
    });
    it('should compile & compress sass file to production targets', function() {
        assert.equal(
            '.icons i{display:inline-block}',
            readFile(path.join(sourceDir, 'main/main.css'))
        );
    });
    it('should compress png file to small size', function() {
        let pngSource = path.join(settings._COMPONENT_ROOT, 'main/i/bg.png');
        let pngResult = path.join(sourceDir, 'main/i/bg.png');

        assert.equal(
            true,
            fs.statSync(pngSource).size > fs.statSync(pngResult).size
        );
    });
    it('should copy assets to target', function() {
        let cur = path.join(sourceDir, 'main/i/mouse.cur');

        assert.equal(true, fs.existsSync(cur));
    });
});

describe('cli/build - sprite', function () {
    let argv = require('minimist')(process.argv.slice(2));
    argv.sprite = true;
    let settings = require('../default')(argv, __dirname);

    before((done) => build(settings, null, done));
    after(function () {
        fse.removeSync('test/app/components/main/__sprite.scss');
        fse.removeSync('test/app/components/main/i/__sprite.png');
    });

    it('should combine sprite to one file', function() {
        let pngResult = path.join(settings._COMPONENT_ROOT, 'main/i/__sprite.png');

        assert.equal(true, fs.existsSync(pngResult));
    });
});

describe('cli/build - input as single file', function () {
    argv.production = true;
    let settings = require('../default')(argv, __dirname);

    afterEach(() => fse.removeSync('test/build'));

    let sourceDir = path.join(settings._DEST_ROOT, settings.component.dir);

    it('should compress single javascript file to production targets', function(done) {
        build(settings, 'test/app/components/main/main.js', function () {
            assert.equal(
                '!function(o){o.location.href="//jd.com"}(window);',
                readFile(path.join(sourceDir, 'main/main.js'))
            );
            done();
        });
    });

    it('should compile & compress single sass file to production targets', function(done) {
        build(settings, 'test/app/components/main/main.scss', function () {
            assert.equal(
                '.icons i{display:inline-block}',
                readFile(path.join(sourceDir, 'main/main.css'))
            );
            done();
        });
    });

    it('should copy assets to target', function(done) {
        let cur = path.join(sourceDir, 'main/i/mouse.cur');

        build(settings, 'test/app/components/main/i/mouse.cur', function () {
            assert.equal(true, fs.existsSync(cur));
            done();
        });
    });

    it('should copy img to target', function(done) {
        let cur = path.join(sourceDir, 'main/i/bg.png');

        build(settings, 'test/app/components/main/i/bg.png', function () {
            assert.equal(true, fs.existsSync(cur));
            done();
        });
    });

    it('should return not validate input', function(done) {
        build(settings, 'test/app/components/main/not.validate.file', function (err) {
            assert.equal(err, 'input not validated');
            done();
        });
    });
});

describe('cli/build - development', function () {
    argv.development = true;
    argv.production = false;
    let settings = require('../default')(argv, __dirname);

    before((done) => build(settings, null, done));
    after(() => fse.removeSync('test/.www'));

    let sourceDir = path.join(settings._SERVER_ROOT, settings.component.dir);

    it('should copy javascript file to development', function() {
        assert.equal(
            `(function(w){w.location.href='//jd.com';})(window);`,
            trimAll(readFile(path.join(sourceDir, 'main/main.js')))
        );
    });
    it('should copy sass file to development', function() {
        assert.equal(
            '/*icons*/.iconsi{display:inline-block;}',
            trimAll(readFile(path.join(sourceDir, 'main/main.css')))
        );
    });
    it('should copy assets to development', function() {
        let cur = path.join(sourceDir, 'main/i/mouse.cur');

        assert.equal(true, fs.existsSync(cur));
    });
    it('should copy img to development', function() {
        let cur = path.join(sourceDir, 'main/i/bg.png');

        assert.equal(true, fs.existsSync(cur));
    });
});

describe('cli/build - log', function () {
    argv.production = true;
    let settings = require('../default')(argv, __dirname);
    settings._showLog = true;

    after(() => fse.removeSync('test/build'));

    it('should get log time for uglify process', function (done) {
        build(settings, 'test/app/components/main/main.js', function (err, res) {
            assert.equal('log success', res);
            done();
        });
    });
});

describe('cli/build - #getSources', function () {
    let settings = require('../default')(argv, __dirname);

    it('should get sources with passed directory', function () {
        let s = build.getSources(settings, 'test/app/views/maco');

        assert.deepEqual(
            [ 'test/app/views/maco/default.html', 'test/app/views/maco/user.html' ],
            s.nunjucks
        );
    });
    it('should get sources with passed js glob pattern', function () {
        let s = build.getSources(settings, 'test/app/components/**/*.js');

        assert.equal(1, s.uglify.length);
        assert.equal('test/app/components/main/main.js', s.uglify[0]);
    });
    it('should get sources with passed scss glob pattern', function () {
        let s = build.getSources(settings, 'test/app/components/**/*.scss');

        assert.deepEqual(
            [ 'test/app/components/footer/footer.rebasePath.scss',
                'test/app/components/footer/footer.scss',
                'test/app/components/main/main.scss',
                'test/app/components/main/mixin/border.scss' ],
            s.sass
        );
    });
    it('should get sources with passed file array', function () {
        let files = ['test/app/components/main/main.js', 'test/app/components/main/main.scss'];
        let s = build.getSources(settings, files);

        assert.equal(1, s.uglify.length);
        assert.equal(1, s.sass.length);
    });
    it('should get sources with passed multi component directory', function () {
        let files = 'footer,main';
        let s = build.getSources(settings, files);

        for ( let key in s ) {
            if ( s.hasOwnProperty(key) ) {
                s[key] = s[key].map(file => utils.dirToPath(utils.relativeDir(file)));
            }
        }
        assert.equal(1, s.uglify.length);
        assert.equal('test/app/components/main/main.js', s.uglify[0]);

        assert.deepEqual(
            [ 'test/app/components/footer/footer.rebasePath.scss',
                'test/app/components/footer/footer.scss',
                'test/app/components/main/main.scss',
                'test/app/components/main/mixin/border.scss' ],
            s.sass
        );

        assert.equal(1, s.nunjucks.length);
        assert.equal('test/app/components/footer/footer.html', s.nunjucks[0]);
    });
    it('should get sources with passed single component directory', function () {
        let files = 'footer';
        let s = build.getSources(settings, files);

        s.nunjucks[0] =  utils.dirToPath(utils.relativeDir(s.nunjucks[0]));

        assert.equal(1, s.nunjucks.length);
        assert.equal('test/app/components/footer/footer.html', s.nunjucks[0]);
    });
    it('should get source with error target', function () {
        assert.throws(
            () => { build.getSources(settings, 'not_found_target') },
            Error
        );
    });
    it('should get all source targets', function () {
        let s = build.getSources(settings);

        let res = {
            uglify: ['test/app/components/**/*.js', '!test/app/components/*/config.js'],
            sass: ['test/app/components/**/*.scss', '!test/app/components/*/config.js'],
            nunjucks: ['test/app/views/*.html', "app/components/*/*.test.html", '!test/app/components/*/config.js'],
            imagemin: ['test/app/components/**/i/*.+(|jpg|png|gif)', '!test/app/components/*/config.js'],
            copy: ['test/app/components/**/*.cur', '!test/app/components/*/config.js']
        };

        assert.deepEqual(res, s);
    });
});

describe('cli/build #getGlobFiles', function () {
    let settings = require('../default')(argv, __dirname);

    it('should get single file with glob pattern', function () {
        assert.deepEqual(
            ['test/config.js' ],
            build.getGlobFiles('test/config.js', settings)
        );
    });
    it('should get mulit file with glob pattern', function () {
        assert.deepEqual(
            ['test/config.js', 'test/cli.build.js'],
            build.getGlobFiles(['test/config.js', 'test/cli.build.js'], settings)
        );
    });
    it('should get mulit file with glob pattern', function () {
        assert.deepEqual(
            ['test/config.js'],
            build.getGlobFiles(['test/config.js', 'config.js'], settings)
        );
    });
});