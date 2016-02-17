'use strict';
const path = require('path');
const _ = require('lodash');
const defaults = {
    production: 'http://your.domain.com/cdn/path',

    scripts: ['app/**/*.js'],
    styles: ['app/**/*.scss'],
    images: ['app/**/i/*.+(|jpg|png|gif)'],
    templates: ['app/views/*.html'],
    sprites: {
        cssName: '__sprite.scss',
        imgName: 'i/__sprite.png',
        items: [
            'app/components/main/**/sprite-*.png',
            'app/components/footer/**/sprite-*.png'
        ]
    },

    source: 'app',
    view: 'views',
    component: {
        dir: 'components',
        config: 'config.js',
        test: '.test.html'
    },
    templateRefs:  ['app/components/*/*.html', 'app/views/*/*.html'],

    assets: ['static/**/*'],
    watchIgnore: /\/maco\/|\/layout\/|config\.js|node_modules/,

    dest: 'build',

    server: {
        dir: '.www',
        port: 80,
        index: false
    },

    deploy: {
        host: '127.0.0.1',
        user: 'ftpuser',
        password: 'ftppass',
        parallel: 10,
        src: 'build/**',
        dest: './'
    }
};

function addRuntimeVal(arg) {
    let config = {};

    try {
        config = require(process.cwd() + '/config.js');
    } catch (err) {
        console.error('Config file not found.');
    }

    let options = _.defaultsDeep(config, defaults);

    options._arg = arg;
    options._cmd = arg._[0];
    options._CWD = process.cwd();
    options._SOURCE_ROOT = path.join(options._CWD, options.source);
    options._VIEW_ROOT = path.join(options._CWD, options.view);
    options._SERVER_ROOT = path.join(path.resolve(options.server.dir));
    options._DEST_ROOT = path.resolve(options._cmd === 'start' ? options.server.dir : options.dest);

    // Development
    options._isDev = /start/.test(options._cmd);
    // Production
    options._isPrd = /build|release|deploy/.test(options._cmd);
    // component data
    options._components = {};

    return options;
}

module.exports = (arg) => addRuntimeVal(arg);