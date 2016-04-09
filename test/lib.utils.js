"use strict";
const path = require("path");
const assert = require("assert");
const utils = require('../lib/utils');

describe('lib/utils - detection', function () {
    it('should return complete command.', function () {
        assert.equal('start', utils.cmdMap['s']);
        assert.equal('build', utils.cmdMap['b']);
        assert.equal('deploy', utils.cmdMap['d']);
        assert.equal('release', utils.cmdMap['r']);
        assert.equal('clear', utils.cmdMap['c']);
    });

    it('should return processor name.', function () {
        assert.equal('uglify', utils.getProcessor('test.js'));
        assert.equal('sass', utils.getProcessor('test.scss'));
        assert.equal('nunjucks', utils.getProcessor('test.html'));
        assert.equal('nunjucks', utils.getProcessor('test.htm'));
        assert.equal('imagemin', utils.getProcessor('test.png'));
        assert.equal('copy', utils.getProcessor('test.cur'));
    });

    it('should a data uri', function () {
        assert.equal(true, utils.isDataUri('data:image/png;base64,iVBORw0KG'));
    });

    it('should a script tag', function () {
        assert.equal('<script src="{{source}}"></script>', utils.getTag('script'));
    });
    it('should a div tag', function () {
        assert.equal('<div></div>', utils.getTag('div'));
    });

    it('should return true', function () {
        assert.equal(true, utils.isArray([]));
        assert.equal(true, utils.isArray([1,2,3]));
        assert.equal(false, utils.isArray(null));
        assert.equal(false, utils.isArray(1));
        assert.equal(false, utils.isArray(true));
    });
});

describe('lib/utils - file dir or path', function () {
    it('should return filename', function () {
        assert.equal('file.js', utils.fileName('path/to/file.js'));
        assert.equal('file', utils.fileName('path/to/file'));
    });

    it('should not hasContents.', function () {
        assert.equal(false, utils.hasContents(__dirname + '/empty.js'));
    });
    it('should hasContents.', function () {
        assert.equal(true, utils.hasContents(__filename));
    });

    it('should a path', function () {
        assert.equal('path/to/file', utils.dirToPath('path\\to/file'));
        assert.equal('/path/to/file', utils.dirToPath('\\path\\to\\file'));
    });

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

    it('should return filename', function () {
        assert.equal(path.normalize('test/lib.utils.js'), utils.relativeDir(__filename));
    });

    it('should not a file', function () {
        assert.equal(false, utils.isFile('wrong file'));
    });
    it('should a file', function () {
        assert.equal(true, utils.isFile(__filename));
    });

    it('should a normal file', function () {
        assert.equal(true, utils.isFile(__filename));
    });
    it('should not be a normal file', function () {
        assert.equal(false, utils.isFile('wrong file'));
        assert.equal(false, utils.isFile('path.js'));
        assert.equal(false, utils.isFile('file.bak'));
    });

    it('should has dirs', function () {
        assert.equal(true, utils.hasDir('app', __dirname));
    });
    it('should has no dirs', function () {
        assert.equal(false, utils.hasDir('index', __dirname));
    });

    it('should return false', function () {
        assert.equal(false, utils.isDir('wrong file'));
    });
    it('should return true', function () {
        assert.equal(true, utils.isDir(__dirname));
    });

    it('should return true', function () {
        assert.equal(true, utils.isGlob('app/*.js'));
        assert.equal(true, utils.isGlob('!app/!**/b.js'));
        assert.equal(false, utils.isGlob('app/path/to/file.js'));
        assert.equal(false, utils.isGlob(1));
        assert.equal(false, utils.isGlob(true));
    });
});
