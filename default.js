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

    /* 压缩文件头注释, 感叹号(!)打头的注释不会被压缩 */
    /* ----- example ----- */
    /*!Name: base.js
     * Date: 2015-51-20 17:21:6 */
    banner: '/*!Name: {{ name }}\n * Date: {{ date }} */\n',

    scripts: ['app/components/**/*.js'],
    styles: ['app/components/**/*.scss'],
    images: ['app/components/**/i/*.+(|png|gif)'],
    templates: ['app/views/*.html', 'app/components/*/*.test.html'],
    sprites: {
        cssName: '__sprite.scss',
        imgName: 'i/__sprite.png',
        items: []
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
    },

    release: {
        cmds: []
    }
};

function addRuntimeVal(arg, configPath) {
    configPath = configPath || process.cwd();
    let config = {};

    try {
        config = require(path.join(configPath, 'config.js'));
    } catch (err) {
        if (cmdMap[arg._[0]] != 'gen') {
            let msg = 'Config file not found. Make sure your cwd has [config.js].';
            console.info(msg);
            return msg;
        }
    }

    let options = _.defaultsDeep(config, defaults);

    options._arg = arg;
    options._cmd = arg._[0];
    options._CWD = configPath || process.cwd();
    options._VERSION = arg.ver || options.version;
    options._MSG = arg.m || '';
    options._SOURCE_ROOT = path.join(options._CWD, options.source);
    options._COMPONENT_ROOT = path.join(options._SOURCE_ROOT, options.component.dir);
    options._VIEW_ROOT = path.join(options._SOURCE_ROOT, options.view);
    options._SERVER_ROOT = path.join(options._CWD, options.server.dir);
    options._WO_ROOT = __dirname;

    // project_name/version_number
    options._PRD_PREFIX = path.join(options.name, options._VERSION);

    // Debug mode
    options._isDebug = options._arg.debug;
    options._showLog = options._arg.log;
    // Force mode
    options._isForce = options._arg.force;

    // Development
    options._isDev = options._arg.development || cmdMap[options._cmd] === 'start';
    // Production
    options._isPrd = options._arg.production || /build|release|deploy/.test(cmdMap[options._cmd]);
    // Release
    //options._isRel = cmdMap[options._cmd] === 'release';

    options._DEST_ROOT = path.resolve(options.dest);
    if (options._isDev) {
        options._DEST_ROOT = options._SERVER_ROOT;
    }
    if (options._isPrd) {
        options._DEST_ROOT = path.join(options._CWD, options.dest, options._PRD_PREFIX);
    }
    //if (options._isRel) {
    //    options._DEST_ROOT = path.join(options._CWD, options.release.dest, options._PRD_PREFIX);
    //}
    // component data
    options._components = {};
    options._sass = {};

    return _.defaultsDeep({}, options);
}

module.exports = addRuntimeVal;
