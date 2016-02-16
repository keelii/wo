'use strict';
const shs = require('static-http-server');
const build = require('./build');

function server(config) {
    shs(config.server.dir, {
        index: config.server.index,
        port: config.server.port
    });
}

module.exports = function(config) {
    build(config);
    server(config);
};