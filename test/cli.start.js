const fs = require("fs");
const http = require("http");
const fse = require('fs-extra');
const path = require("path");
const assert = require("assert");

const argv = require('minimist')(process.argv.slice(2));
argv.development = true;
const settings = require('../default')(argv, __dirname, true);
const start = require('../cli/start');

describe('cli/start', function() {
    before(function (done) {
        start(settings, done);
    });
    it('should start a local http server.', function (done) {
        http.get('http://localhost:2048/', (res) => {
            assert.equal(200, res.statusCode);
            done();
        }).on('error', (e) => {
            throw new Error(e);
        });
    });

    after(function () {
        fse.removeSync('test/.www');
    });
});
