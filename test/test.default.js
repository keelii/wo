"use strict";
const path = require("path");
const assert = require("assert");
const utils = require('../lib/utils');

function getCurrentPath(dir) {
    return utils.dirToPath(utils.relativeDir(dir));
}

describe('defaults - no config', function () {
    let argv = require('minimist')(process.argv.slice(2));
    argv.config = path.join(__dirname, 'config.not.found.js');

    argv.production = true;
    argv.development = false;

    let init = require('../default');

    after(() => argv.config = path.join(__dirname, 'config.js') );

    it('should will not inited ', function () {
        let msg = init(argv);
        assert.equal(
            'Config file not found. Make sure your cwd has [config.js].',
            msg
        );
    });
});

describe('defaults - production', function () {
    let argv = require('minimist')(process.argv.slice(2));
    argv.config = path.join(__dirname, 'config.js');

    argv.production = true;
    argv.development = false;

    let settings = require('../default')(argv);

    it('should get production paths', function () {

        assert.equal('app', getCurrentPath(settings._SOURCE_ROOT));
        assert.equal('app/views', getCurrentPath(settings._VIEW_ROOT));
        assert.equal('app/components', getCurrentPath(settings._COMPONENT_ROOT));
        assert.equal('build/project_name/0.0.0', getCurrentPath(settings._DEST_ROOT));
    });
});

describe('defaults - development', function () {
    let argv = require('minimist')(process.argv.slice(2));
    argv.config = path.join(__dirname, 'config.js');

    argv.production = false;
    argv.development = true;

    let settings = require('../default')(argv);

    it('should get development paths', function () {


        assert.equal('app', getCurrentPath(settings._SOURCE_ROOT));
        assert.equal('app/views', getCurrentPath(settings._VIEW_ROOT));
        assert.equal('app/components', getCurrentPath(settings._COMPONENT_ROOT));
        assert.equal('.www', getCurrentPath(settings._DEST_ROOT));
    });
});
