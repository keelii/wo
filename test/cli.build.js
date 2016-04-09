"use strict";
const fs = require("fs");
const path = require("path");
const assert = require("assert");
const fse = require('fs-extra');

const argv = require('minimist')(process.argv.slice(2));
const utils = require('../lib/utils');

const build = require('../cli/build');
const getSources = require('../cli/build').getSources;
const getGlobFiles = require('../cli/build').getGlobFiles;

function readFile(filename) {
    let content = fs.readFileSync(filename, 'utf8');
    return content.replace(/^\s+|\s+$/g, '');
}

describe('cli/build', function () {
    argv.production = true;
    let settings = require('../default')(argv, __dirname);

    before(function (done) {
        build(settings, null, done);
    });
    after(function () {
        fse.removeSync('test/build');
    });

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
    it('should combine sprite to one file', function() {
        let pngResult = path.join(sourceDir, 'main/i/__sprite.png');

        assert.equal(true, fs.existsSync(pngResult));
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

describe('cli/build - #getSources', function () {
    let settings = require('../default')(argv, __dirname);

    it('should get sources with passed directory', function () {
        let s = getSources(settings, 'test/app/views/maco');

        assert.equal(2, s.nunjucks.length);
        assert.deepEqual(
            [ 'test/app/views/maco/default.html', 'test/app/views/maco/user.html' ],
            s.nunjucks
        );
    });

    it('should get sources with passed js glob pattern', function () {
        let s = getSources(settings, 'test/app/components/**/*.js');

        assert.equal(1, s.uglify.length);
        assert.equal('test/app/components/main/main.js', s.uglify[0]);
    });
    it('should get sources with passed scss glob pattern', function () {
        let s = getSources(settings, 'test/app/components/**/*.scss');

        assert.equal(3, s.sass.length);
        assert.deepEqual(
            [ 'test/app/components/main/__sprite.scss',
                'test/app/components/main/main.scss',
                'test/app/components/main/mixin/border.scss' ],
            s.sass
        );
    });

    it('should get sources with passed file array', function () {
        var files = ['test/app/components/main/main.js', 'test/app/components/main/main.scss'];
        let s = getSources(settings, files);

        assert.equal(1, s.uglify.length);
        assert.equal(1, s.sass.length);
    });

    it('should get sources with passed multi component directory', function () {
        var files = 'footer,main';
        let s = getSources(settings, files);

        for ( var key in s ) {
            if ( s.hasOwnProperty(key) ) {
                s[key] = s[key].map(file => utils.dirToPath(utils.relativeDir(file)));
            }
        }

        assert.equal(1, s.uglify.length);
        assert.equal('test/app/components/main/main.js', s.uglify[0]);

        assert.equal(2, s.sass.length);
        assert.deepEqual(
            [ 'test/app/components/main/__sprite.scss',
                'test/app/components/main/main.scss' ],
            s.sass
        );

        assert.equal(1, s.nunjucks.length);
        assert.equal('test/app/components/footer/footer.html', s.nunjucks[0]);
    });
    it('should get sources with passed single component directory', function () {
        var files = 'footer';
        let s = getSources(settings, files);

        s.nunjucks[0] =  utils.dirToPath(utils.relativeDir(s.nunjucks[0]));

        assert.equal(1, s.nunjucks.length);
        assert.equal('test/app/components/footer/footer.html', s.nunjucks[0]);
    });

    it('should get source with error target', function () {
        assert.throws(
            () => { getSources(settings, 'not_found_target') },
            Error
        );
    });

    it('should get all source targets', function () {
        let s = getSources(settings);

        var res = {
            uglify: ['test/app/components/**/*.js', '!test/app/components/*/config.js'],
            sass: ['test/app/components/**/*.scss', '!test/app/components/*/config.js'],
            nunjucks: ['test/app/views/*.html', '!test/app/components/*/config.js'],
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
            getGlobFiles('test/config.js', settings)
        );
    });
    it('should get mulit file with glob pattern', function () {
        assert.deepEqual(
            ['test/config.js', 'test/cli.build.js'],
            getGlobFiles(['test/config.js', 'test/cli.build.js'], settings)
        );
    });
    it('should get mulit file with glob pattern', function () {
        assert.deepEqual(
            ['test/config.js'],
            getGlobFiles(['test/config.js', 'config.js'], settings)
        );
    });
});

