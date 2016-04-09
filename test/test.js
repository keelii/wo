/*
'use strict';
const fs = require('fs');
const path = require('path');
const assert = require("assert");

const fse = require('fs-extra');
const async = require('async');
const request = require('request');

const argv = require('minimist')(process.argv.slice(2));

function readFile(filename) {
    var content = fs.readFileSync(filename, 'utf8');
    return content.replace(/^\s+|\s+$/g, '');
}

describe('cli/', function() {
    describe('#buid() uglify, sass', function () {
        let settings = require('../default')(argv, __dirname);
        let build = require('../cli/build');

        it('should build file to targets', function(done) {
            settings._isPrd = true;
            settings._DEST_ROOT = path.join(settings._CWD, settings.dest, settings._PRD_PREFIX);

            build(settings, null, function () {
                assert.equal(
                    '!function(o){o.location.href="//jd.com"}(window);',
                    readFile(path.join(settings._DEST_ROOT, settings.component.dir, 'main/main.js'))
                );
                assert.equal(
                    '.icons i{display:inline-block}',
                    readFile(path.join(settings._DEST_ROOT, settings.component.dir, 'main/main.css'))
                );

                done();
            });
        });
    });


    describe('build.Processor', function() {
        let config = {
            nolog: true,
            source: 'src',

            production: 'http://jd.com/',
            view: 'views',
            dest: 'result',
            banner: '',
            sprites: {
                cssName: '__sprite.scss',
                imgName: 'i/__sprite.png',
                items: []
            },

            uglify: {
                mangle: {
                    except: ['define', 'require', 'module', 'exports']
                }
            },
            cleanCSS: {},
            pngquant: {
                quality: '80-90',
                speed: 4
            },

            component: {
                dir: 'components',
                config: 'config.js',
                test: '.test.html'
            },

            _isPrd: false,
            _PRD_PREFIX: 'path/cdn',
            _SOURCE_ROOT: path.join(__dirname, 'src'),
            _DEST_ROOT: path.join(__dirname, 'result'),
            _components: {}
        };
        const Processor = require('../cli/build').Processor;

        it('should compress script file', function(done) {
            config._isPrd = true;
            Processor.uglify(config, 'test/src/test.uglify.js', function() {
                assert.equal(
                    '!function(){var o="hello world.";return o.length>0?o.toLocaleLowerCase():void 0}();',
                    readFile('test/result/test.uglify.js')
                );
                done();
            });
        });
        it('should complie sass to css file', function(done) {
            Processor.sass(config, 'test/src/test.sass.scss', function() {
                let result = fs.readFileSync('test/result/test.sass.css', 'utf8');

                assert.equal(
                    'body{text-align:center}body ul{list-style:none}',
                    readFile('test/result/test.sass.css')
                );
                done();
            });
        });
        it('should complie sass to css file without compressed.', function(done) {
            config._isDev = true;
            Processor.sass(config, 'test/src/test.sass.scss', function() {
                let result = fs.readFileSync('test/result/test.sass.css', 'utf8');

                assert.equal(
                    'body {\n  text-align: center; }\n  body ul {\n    list-style: none; }',
                    readFile('test/result/test.sass.css')
                );
                done();
            });
        });
        it('should complie nunjucks to html file', function(done) {
            Processor.nunjucks(config, 'test/src/test.nunjucks.html', function() {
                assert.equal(
                    '<div id="box">3</div>',
                    readFile('test/result/test.nunjucks.html')
                );
                done();
            });
        });
        it('should compress png file', function(done) {
            Processor.imagemin(config, 'test/src/test.imagemin.png', function () {
                assert.equal(true, fs.existsSync('test/result/test.imagemin.png'));
                assert.equal(true,
                    fs.statSync('test/src/test.imagemin.png').size > fs.statSync('test/result/test.imagemin.png').size
                );
                done();
            })
        });
    });

    describe('Start', function() {
        let config = {
            source: 'src',

            production: 'http://jd.com/',
            view: 'views',
            dest: 'result',
            sprites: {
                cssName: '__sprite.scss',
                imgName: 'i/__sprite.png',
                items: []
            },

            component: {
                dir: 'components',
                config: 'config.js',
                test: '.test.html'
            },

            _isPrd: false,
            _PRD_PREFIX: 'path/cdn',
            _SOURCE_ROOT: path.join(__dirname, 'src'),
            _DEST_ROOT: path.join(__dirname, 'result'),
            _components: {}
        };
        let start = require('../cli/start');
        let settings = require('../default')(argv, __dirname);

        it('should start a local http server.', function (done) {
            settings._DEST_ROOT = settings._SERVER_ROOT;

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

    describe('Gen', function () {
        let settings = require('../default')(argv, __dirname);
        const gen = require('../cli/gen');
        it('should generate a new project named test_proj.', function (done) {
            gen(settings, 'test_proj', function () {
                assert.equal(true, fs.existsSync(path.join(process.cwd(), 'test_proj')));
                done();
            });
        });
    });

    after(function () {
        fse.removeSync('test/.www');
        fse.removeSync('test/build');
        fse.removeSync('test/result');
        fse.removeSync('test_proj');
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
        describe('#hasContents()', function () {
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
        describe('#isArray()', function () {
            it('should return true', function () {
                assert.equal(true, utils.isArray([]));
                assert.equal(true, utils.isArray([1,2,3]));
                assert.equal(false, utils.isArray(null));
                assert.equal(false, utils.isArray(1));
                assert.equal(false, utils.isArray(true));
            });
        });
        describe('#isGlob()', function () {
            it('should return true', function () {
                assert.equal(true, utils.isGlob('app/!*.js'));
                assert.equal(true, utils.isGlob('!app/!**!/b.js'));
                assert.equal(false, utils.isGlob('app/path/to/file.js'));
                assert.equal(false, utils.isGlob(1));
                assert.equal(false, utils.isGlob(true));
            });
        });
        describe('#getTag()', function () {
            it('should a script tag', function () {
                assert.equal('<script src="{{source}}"></script>', utils.getTag('script'));
            });
            it('should a div tag', function () {
                assert.equal('<div></div>', utils.getTag('div'));
            });
        });
        describe('#fileName()', function () {
            it('should return filename', function () {
                assert.equal('file.js', utils.fileName('path/to/file.js'));
                assert.equal('file', utils.fileName('path/to/file'));
            });
        });
        describe('#relativeDir()', function () {
            it('should return filename', function () {
                assert.equal(path.normalize('test/test.js'), utils.relativeDir(__filename));
            });
        });
        describe('#isFile()', function () {
            it('should not a file', function () {
                assert.equal(false, utils.isFile('wrong file'));
            });
            it('should a file', function () {
                assert.equal(true, utils.isFile(__filename));
            })
        });
        describe('#isNormalFile()', function () {
            it('should a normal file', function () {
                assert.equal(true, utils.isFile(__filename));
            });
            it('should not be a normal file', function () {
                assert.equal(false, utils.isFile('wrong file'));
                assert.equal(false, utils.isFile('path.js'));
                assert.equal(false, utils.isFile('file.bak'));
            });
        });
        describe('#hasDir()', function () {
            it('should has dirs', function () {
                assert.equal(true, utils.hasDir('app', __dirname));
            });
            it('should has no dirs', function () {
                assert.equal(false, utils.hasDir('index', __dirname));
            });
        });
        describe('#isDir()', function () {
            it('should return false', function () {
                assert.equal(false, utils.isDir('wrong file'));
            });
            it('should return true', function () {
                assert.equal(true, utils.isDir(__dirname));
            })
        });
    });
});
*/
