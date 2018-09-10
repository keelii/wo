"use strict";
const fs = require("fs");
const path = require("path");
const assert = require("assert");
const fse = require('fs-extra');

const utils = require('../lib/utils');
const build = require('../cli/build');

let argv = require('minimist')(process.argv.slice(2));
argv.config = path.join(__dirname, 'config.js');

function readFile(filename) {
    let content = fs.readFileSync(filename, 'utf8');
    return content.replace(/^\s+|\s+$/g, '');
}

function trimAll(str) {
    return str.replace(/\s+/g, '');
}

describe('cli/build - no input', function () {
    argv.development = false;
    argv.production = true;
    let settings = require('../default')(argv);

    before((done) => build(settings, null, done));
    after(() => fse.removeSync('build'));

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

describe('cli/build - input as single file', function () {
    argv.development = false;
    argv.production = true;

    let settings = require('../default')(argv);

    afterEach(() => fse.removeSync('build'));

    let sourceDir = path.join(settings._DEST_ROOT, settings.component.dir);

    it('should compress single javascript file to production targets', function(done) {
        build(settings, 'app/components/main/main.js', function () {
            assert.equal(
                '!function(o){o.location.href="//jd.com"}(window);',
                readFile(path.join(sourceDir, 'main/main.js'))
            );
            done();
        });
    });

    it('should compile & compress single sass file to production targets', function(done) {
        build(settings, 'app/components/main/main.scss', function () {
            assert.equal(
                '.icons i{display:inline-block}',
                readFile(path.join(sourceDir, 'main/main.css'))
            );
            done();
        });
    });

    it('should copy assets to target', function(done) {
        let cur = path.join(sourceDir, 'main/i/mouse.cur');

        build(settings, 'app/components/main/i/mouse.cur', function () {
            assert.equal(true, fs.existsSync(cur));
            done();
        });
    });

    it('should copy img to target', function(done) {
        let cur = path.join(sourceDir, 'main/i/bg.png');

        build(settings, 'app/components/main/i/bg.png', function () {
            assert.equal(true, fs.existsSync(cur));
            done();
        });
    });

    it('should return not validate input', function(done) {
        build(settings, 'app/components/main/not.validate.file', function (err) {
            assert.equal(err, 'input not validated');
            done();
        });
    });
});

describe('cli/build - development', function () {
    argv.development = true;
    argv.production = false;

    let settings = require('../default')(argv);

    before((done) => build(settings, null, done));
    after(() => fse.removeSync('.www'));

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
    let settings = require('../default')(argv);
    settings._showLog = true;

    after(() => fse.removeSync('build'));

    it('should get log time for uglify process', function (done) {
        build(settings, 'app/components/main/main.js', function (err, res) {
            assert.equal('log success', res);
            done();
        });
    });
});

describe('cli/build - #getSources', function () {
    let settings = require('../default')(argv);

    it('should get sources with passed directory', function () {
        let s = build.getSources(settings, 'app/views/maco');

        assert.deepEqual(
            [ 'app/views/maco/default.html', 'app/views/maco/user.html' ],
            s.nunjucks
        );
    });
    it('should get sources with passed js glob pattern', function () {
        let s = build.getSources(settings, 'app/components/**/*.js');

        assert.equal(1, s.uglify.length);
        assert.equal('app/components/main/main.js', s.uglify[0]);
    });
    it('should get sources with passed scss glob pattern', function () {
        let s = build.getSources(settings, 'app/components/**/*.scss');

        assert.deepEqual(
            [ 'app/components/footer/footer.rebasePath.scss',
                'app/components/footer/footer.scss',
                'app/components/main/main.scss',
                'app/components/main/mixin/border.scss' ],
            s.sass
        );
    });
    it('should get sources with passed file array', function () {
        let files = ['app/components/main/main.js', 'app/components/main/main.scss'];
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
        assert.equal('app/components/main/main.js', s.uglify[0]);

        assert.deepEqual(
            [ 'app/components/footer/footer.rebasePath.scss',
                'app/components/footer/footer.scss',
                'app/components/main/main.scss',
                'app/components/main/mixin/border.scss' ],
            s.sass
        );

        assert.equal(1, s.nunjucks.length);
        assert.equal('app/components/footer/footer.html', s.nunjucks[0]);
    });
    it('should get sources with passed single component directory', function () {
        let files = 'footer';
        let s = build.getSources(settings, files);

        s.nunjucks[0] =  utils.dirToPath(utils.relativeDir(s.nunjucks[0]));

        assert.equal(1, s.nunjucks.length);
        assert.equal('app/components/footer/footer.html', s.nunjucks[0]);
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
            uglify: ['app/components/**/*.js', '!app/components/*/config.js'],
            sass: ['app/components/**/*.scss', '!app/components/*/config.js'],
            nunjucks: ['app/views/*.html', "app/components/*/*.test.html", '!app/components/*/config.js'],
            imagemin: ['app/components/**/i/*.+(|jpg|png|gif)', '!app/components/*/config.js'],
            copy: ['app/components/**/*.cur', '!app/components/*/config.js']
        };

        assert.deepEqual(res, s);
    });
});

describe('cli/build #getGlobFiles', function () {
    let settings = require('../default')(argv);

    it('should get single file with glob pattern', function () {
        assert.deepEqual(
            ['config.js' ],
            build.getGlobFiles('config.js', settings)
        );
    });
    it('should get mulit file with glob pattern', function () {
        assert.deepEqual(
            ['config.js', 'build.js'],
            build.getGlobFiles(['config.js', 'build.js'], settings)
        );
    });
    it('should get mulit file with glob pattern', function () {
        assert.deepEqual(
            ['config.js'],
            build.getGlobFiles(['config.js', 'config.js'], settings)
        );
    });
});
