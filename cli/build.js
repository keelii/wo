'use strict';
const vfs = require('vinyl-fs');
const Uglify = require('../lib/uglify');
const Sass = require('../lib/sass');
const Nunjucks = require('../lib/nunjucks');
const Component = require('../lib/component');
const Sprite = require('../lib/sprite');
const pngquant = require('../lib/pngquant');
const rebasePath = require('../lib/rebasePath');
const cleanCSS = require('../lib/cleanCSS');
const banner = require('../lib/banner');

const fse = require('fs-extra');
const async = require('async');
const globby = require('globby');
const _ = require('lodash');
const utils = require('../lib/utils');

let Processor = {};
Processor.uglify = function (config, input, callback) {
    callback = callback || function() {};
    let source = input || config.scripts;

    config.uglify.enabled = config._isPrd && !config._isDebug;

    vfs.src(source, { base: config._SOURCE_ROOT })
        .pipe(Uglify(config.uglify))
        .pipe(banner({
            enabled: config._isPrd,
            template: config.banner
        }))
        .pipe(vfs.dest(config._DEST_ROOT))
        .on('end', handleCallback('uglify', config, callback));
};
Processor.sass = function (config, input, callback) {
    callback = callback || function() {};
    let source = input || config.styles;
    let nocompressed = config._isDebug || config._isDev;

    config.cleanCSS.enabled = nocompressed ? false: config._isPrd;

    vfs.src(source, { base: config._SOURCE_ROOT})
        .pipe(Sass({
            config: config,
            debug: nocompressed
        }))
        .pipe(cleanCSS(config.cleanCSS))
        .pipe(rebasePath({
            enabled: config._isPrd,
            base: config._SOURCE_ROOT,
            prefix: config.production + utils.dirToPath(config._PRD_PREFIX)
        }))
        .pipe(banner({
            enabled: config._isPrd,
            template: config.banner
        }))
        .pipe(vfs.dest(config._DEST_ROOT))
        .on('end', handleCallback('sass', config, callback));
};
Processor.nunjucks = function (config, input, callback) {
    callback = callback || function() {};
    let source = input || config.templates;

    vfs.src(source, { base: config._SOURCE_ROOT})
        .pipe(Component(config))
        .pipe(Nunjucks(config))
        .pipe(vfs.dest(config._DEST_ROOT))
        .on('end', handleCallback('nunjucks', config, callback));
};
Processor.imagemin = function (config, input, callback) {
    callback = callback || function() {};
    let source = input || config.images;

    vfs.src(source, {base: config._SOURCE_ROOT})
        .pipe(pngquant(config.pngquant)())
        .pipe(vfs.dest(config._DEST_ROOT))
        .on('end', handleCallback('imagemin', config, callback));
};
Processor.copy = function (config, input, callback) {
    callback = callback || function() {};
    let source = input || config.assets;

    vfs.src(source, {base: config._SOURCE_ROOT})
        .pipe(vfs.dest(config._DEST_ROOT))
        .on('end', handleCallback('copy', config, callback));
};

function handleCallback(name, config, callback) {
    return function() {
        if (config._isDebug) {
            console.timeEnd(name);
        }
        callback();
    };
}

function getSources (config, input) {
    let files = null;
    let sources = {
        uglify: [],
        sass: [],
        nunjucks: [],
        imagemin: [],
        copy: []
    };

    if (input) {
        if (utils.isDir(input)) {
            files = getGlobFiles(input + '/**', config);
        }
        if (utils.isGlob(input)) {
            files = getGlobFiles(input, config);
        }
        if (utils.isArray(input)) {
            files = input;
        }

        files.forEach(f => sources[utils.getProcessor(f)].push(f));
    } else {
        sources = {
            uglify  : config.scripts.concat(config.globalIgnore),
            sass    : config.styles.concat(config.globalIgnore),
            nunjucks: config.templates.concat(config.globalIgnore),
            imagemin: config.images.concat(config.globalIgnore),
            copy    : config.assets.concat(config.globalIgnore)
        };
    }

    return sources;
}

function getGlobFiles(glob, config) {
    return globby.sync([glob].concat(config.globalIgnore), { nodir: true });
}

function build(config, input, callback) {
    if (utils.isFile(input)) {
        return Processor[utils.getProcessor(input)](config, input, callback);
    }

    let s = getSources(config, input);
    let tasks = [];

    // 开发环境复制脚本、图片、测试到本地服务器
    if (config._isDev) {
        s.copy = _.concat(config.scripts, config.images, config.assets, s.copy);
    }

    if (config._isDebug) {
        console.time('uglify');
        console.time('sass');
        console.time('imagemin');
        console.time('nunjucks');
        console.time('copy');
    }

    if (s.uglify.length && config._isPrd) {
        tasks.push(cb => Processor.uglify(config, s.uglify, cb));
    }
    if (s.sass.length) {
        tasks.push(cb => Processor.sass(config, s.sass, cb));
    }
    if (s.imagemin.length && config._isPrd) {
        tasks.push(cb => Processor.imagemin(config, s.imagemin, cb));
    }
    if (s.nunjucks.length) {
        if (config._arg.nunjucks || config._isDev) {
            tasks.push(cb => Processor.nunjucks(config, s.nunjucks, cb));
        }
    }
    if (s.copy.length) {
        tasks.push(cb => Processor.copy(config, s.copy, cb));
    }
    async.series(tasks, callback);
}

module.exports = function (config, input, callback) {
    input = input || config._arg._[1];
    callback = callback || function() {};

    let cmd = config._arg;

    fse.removeSync(config.dest);

    // build --sprite
    if (cmd.sprite) {
        return Sprite(config, callback);
    }

    // build --nunjucks
    if (cmd.nunjucks) {
        return build(config, config.templates[0], callback);
    }
    if (cmd.uglify) {
        return build(config, config.scripts[0], callback);
    }
    if (cmd.sass) {
        return build(config, config.styles[0], callback);
    }
    if (cmd.imagemin) {
        return build(config, config.images[0], callback);
    }

    build(config, input, callback);
};

module.exports.Processor = Processor;
