'use strict';
const path = require('path');
const cmdMap = require('./lib/utils').cmdMap;
const _ = require('lodash');

const defaults = {
    /**
     * wo 中有两种路径
     * 1. 线上文件夹路径
     *    build/name/version/RELATIVE_DIR
     * 2. 样式文件图片引用路径
     *    production/name/version/RELATIVE_DIR
     */
    name: 'project_name',
    version: '0.0.0',

    production: 'http://your.domain.com/cdn-path/',

    scripts: ['app/components/**/*.js'],
    styles: ['app/components/**/*.scss'],
    images: ['app/components/**/i/*.+(|png|gif)'],
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

    tests: ['app/tests/**'],
    assets: ['app/components/**/*.+(|css|cur)'],
    globalIgnore: ['!app/components/*/config.js'],
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
        parallel: 5,
        src: 'build/**',
        dest: './'
    }
};

function addRuntimeVal(arg, configPath) {
    configPath = configPath || process.cwd();
    let config = {};

    try {
        config = require(path.join(configPath, 'config.js'));
    } catch (err) {
        if (cmdMap[arg._[0]] != 'gen') {
            console.info('Config file not found. try [wo gen] to generate a demo project.');
        }
    }

    let options = _.defaultsDeep(config, defaults);

    options._arg = arg;
    options._cmd = arg._[0];
    options._CWD = configPath || process.cwd();
    options._VERSION = arg.ver || options.version;
    options._SOURCE_ROOT = path.join(options._CWD, options.source);
    options._VIEW_ROOT = path.join(options._SOURCE_ROOT, options.view);
    options._SERVER_ROOT = path.join(options._CWD, options.server.dir);
    options._WO_ROOT = __dirname;

    // project_name/version_number
    options._PRD_PREFIX = path.join(options.name, options._VERSION);

    // Development
    options._isDev = options._arg.development || cmdMap[options._cmd] === 'start';
    // Production
    options._isPrd = options._arg.production || /build|release|deploy/.test(cmdMap[options._cmd]);

    options._DEST_ROOT = options._isDev
        ? options._SERVER_ROOT
        : path.join(options._CWD, options.dest, options._PRD_PREFIX);

    // component data
    options._components = {};

    return options;
}

module.exports = addRuntimeVal;