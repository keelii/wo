'use strict';
const fs = require('fs');
const path = require('path');
const assert = require("assert");

const rimraf = require('rimraf');
const async = require('async');
const request = require('request');

describe('cli/', function() {
    let config = {
        source: path.join(__dirname, 'src'),
        _SOURCE_ROOT: path.join(__dirname, 'src'),
        _DEST_ROOT: path.join(__dirname, 'result'),
        view: 'views',
        _isPrd: false,
        production: 'http://jd.com/',
        _PRD_PREFIX: 'path/cdn',

        component: {
            dir: 'components',
            config: 'config.js',
            test: '.test.html'
        },

        _components: {}
    };

    describe('build.Processor', function() {
        const Processor = require('../cli/build').Processor;

        it('should compress script file', function(done) {
            Processor.uglify(config, 'test/src/test.uglify.js', function() {
                let result = fs.readFileSync('test/result/test.uglify.js', 'utf8');

                assert.equal(result, '!function(){var o="hello world.";return o.length>0?o.toLocaleLowerCase():void 0}();');
                done();
            });
        });
        it('should complie sass to css file', function(done) {
            Processor.sass(config, 'test/src/test.sass.scss', function() {
                let result = fs.readFileSync('test/result/test.sass.css', 'utf8');

                assert.equal(result, 'body{text-align:center}body ul{list-style:none}\n');
                done();
            });
        });
        it('should complie nunjucks to html file', function(done) {
            Processor.nunjucks(config, 'test/src/test.nunjucks.html', function() {
                let result = fs.readFileSync('test/result/test.nunjucks.html', 'utf8');

                assert.equal(result, '<div id="box">3</div>');
                done();
            });
        });

        // clearn up
        after(function() {
            rimraf.sync('test/result');
        });
    });

    describe('Start', function() {
        const argv = require('minimist')(process.argv.slice(2));
        const settings = require('../default')(argv, __dirname, true);

        const start = require('../cli/start');

        it('should start a local http server.', function (done) {
            start(settings, function(err) {
                request('http://localhost:2048/', function (error, response, body) {
                    if (error) {
                        throw new Error(error);
                    }
                    assert.equal(200, response.statusCode);
                    done();
                });
            });
        });
    });

    describe('Clear', function() {
        const argv = require('minimist')(process.argv.slice(2));
        const settings = require('../default')(argv, __dirname, true);

        const clear = require('../cli/clear');

        it('should remove build/.www dir.', function (done) {
            clear(settings, function () {
                assert.equal(false, !!fs.exists(path.join(__dirname, '.www')));
                assert.equal(false, !!fs.exists(path.join(__dirname, 'build')));
                done();
            });
        });
    });

    describe('Release', function() {
        const release = require('../cli/release');
        it('should return a string.', function () {
            assert.equal('to be done.', release());
        });
    });

    after(function () {
        rimraf.sync('test/.www');
        rimraf.sync('test/build');
    });
});

describe('lib/', function() {
    const utils = require('../lib/utils');

    describe('utils.js', function () {
        describe('#cmdMap()', function () {
            it('should return complete command.', function () {
                assert.equal('start', utils.cmdMap['s']);
                assert.equal('build', utils.cmdMap['b']);
                assert.equal('deploy', utils.cmdMap['d']);
                assert.equal('release', utils.cmdMap['r']);
                assert.equal('clear', utils.cmdMap['c']);
            });
        });
        describe('#getProcessor()', function () {
            it('should return processor name.', function () {
                assert.equal('uglify', utils.getProcessor('test.js'));
                assert.equal('sass', utils.getProcessor('test.scss'));
                assert.equal('nunjucks', utils.getProcessor('test.html'));
                assert.equal('nunjucks', utils.getProcessor('test.htm'));
                assert.equal('imagemin', utils.getProcessor('test.png'));
                assert.equal('copy', utils.getProcessor('test.cur'));
            });
        });
        describe('#getProcessor()', function () {
            it('should not hasContents.', function () {
                assert.equal(false, utils.hasContents(__dirname + '/empty.js'));
            });
            it('should hasContents.', function () {
                assert.equal(true, utils.hasContents(__filename));
            });
        });
        describe('#isAbsUrl()', function () {
            it('should a absolute url', function () {
                assert.equal(true, utils.isAbsUrl('//'));
                assert.equal(true, utils.isAbsUrl('http://'));
                assert.equal(true, utils.isAbsUrl('https://'));
            });
            it('should not a absolute url', function () {
                assert.equal(false, utils.isAbsUrl('/app'));
                assert.equal(false, utils.isAbsUrl('app/js'));
                assert.equal(false, utils.isAbsUrl('../app'));
            });
        });
        describe('#dirToPath()', function () {
            it('should a path', function () {
                assert.equal('path/to/file', utils.dirToPath('path\\to/file'));
                assert.equal('/path/to/file', utils.dirToPath('\\path\\to\\file'));
            });
        });
        describe('#isDataUri()', function () {
            it('should a data uri', function () {
                assert.equal(true, utils.isDataUri('data:image/png;base64,iVBORw0KG'));
            });
        });
        describe('#getTag()', function () {
            it('should a script tag', function () {
                assert.equal('<script src="{{source}}"></script>', utils.getTag('script'));
            })
        });
    });
});
