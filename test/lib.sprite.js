"use strict";
const fs = require("fs");
const path = require("path");
const assert = require("assert");
const fse = require('fs-extra');

const build = require('../cli/build');

let argv = require('minimist')(process.argv.slice(2));
argv.config = path.join(__dirname, 'config.js');

describe('cli/build - sprite', function () {
    argv.sprite = true;
    let settings = require('../default')(argv);

    before((done) => build(settings, null, done));

    after(function () {
        fse.removeSync('app/components/main/__sprite.scss');
        fse.removeSync('app/components/main/i/__sprite.png');
    });

    it('should combine sprite to one file', function() {
        let pngResult = path.join(settings._COMPONENT_ROOT, 'main/i/__sprite.png');

        assert.equal(true, fs.existsSync(pngResult));
    });
});
