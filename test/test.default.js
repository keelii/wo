"use strict";
const path = require("path");
const assert = require("assert");
const utils = require('../lib/utils');

function getCurrentPath(dir) {
    return utils.dirToPath(utils.relativeDir(dir));
}

describe('defaults - production', function () {
    let argv = require('minimist')(process.argv.slice(2));
    argv.production = true;
    argv.development = false;
    let init = require('../default');

    it('should will not inited ', function () {
        let msg = init(argv);
        assert.equal(
            'Config file not found. Make sure your cwd has [config.js].',
            msg
        );
    });

    it('should get production paths', function () {
        let settings = init(argv, __dirname);

        assert.equal('test/app', getCurrentPath(settings._SOURCE_ROOT));
        assert.equal('test/app/views', getCurrentPath(settings._VIEW_ROOT));
        assert.equal('test/app/components', getCurrentPath(settings._COMPONENT_ROOT));
        assert.equal('test/build/project_name/0.0.0', getCurrentPath(settings._DEST_ROOT));
    });
});

describe('defaults - production', function () {
    let argv = require('minimist')(process.argv.slice(2));
    argv.production = false;
    argv.development = true;
    let init = require('../default');

    it('should get development paths', function () {
        let settings = init(argv, __dirname);

        assert.equal('test/app', getCurrentPath(settings._SOURCE_ROOT));
        assert.equal('test/app/views', getCurrentPath(settings._VIEW_ROOT));
        assert.equal('test/app/components', getCurrentPath(settings._COMPONENT_ROOT));
        assert.equal('test/.www', getCurrentPath(settings._DEST_ROOT));
    });
});
