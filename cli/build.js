'use strict';
const vfs = require('vinyl-fs');
const Uglify = require('../lib/uglify');
const Sass = require('../lib/sass');
const Nunjucks = require('../lib/nunjucks');
const Component = require('../lib/component');
const Sprite = require('../lib/sprite');
const pngquant = require('../lib/pngquant');
const rebasePath = require('../lib/rebasePath');

const rimraf = require('rimraf');
const async = require('async');
const globby = require('globby');
const isGlob = require('is-glob');
const _ = require('lodash');
const utils = require('../lib/utils');

let Processor = {};
Processor.uglify = function (config, input, callback) {
    callback = callback || function() {};
    let source = input || config.scripts;

    vfs.src(source, { base: config._SOURCE_ROOT})
        .pipe(Uglify({
            mangle: {
                except: ['define', 'require', 'module', 'exports']
            }
        }))
        .pipe(vfs.dest(config._DEST_ROOT))
        .on('end', callback);
};
Processor.sass = function (config, input, callback) {
    callback = callback || function() {};
    let source = input || config.styles;

    vfs.src(source, { base: config._SOURCE_ROOT})
        .pipe(Sass())
        .pipe(rebasePath({
            enabled: config._isPrd,
            base: config._SOURCE_ROOT,
            prefix: config.production + utils.dirToPath(config._PRD_PREFIX)
        }))
        .pipe(vfs.dest(config._DEST_ROOT))
        .on('end', callback);
};
Processor.nunjucks = function (config, input, callback) {
    callback = callback || function() {};
    let source = input || config.templates;

    vfs.src(source, { base: config._SOURCE_ROOT})
        .pipe(Component(config))
        .pipe(Nunjucks(config))
        .pipe(vfs.dest(config._DEST_ROOT))
        .on('end', callback);
};
Processor.imagemin = function (config, input, callback) {
    callback = callback || function() {};
    let source = input || config.images;

    vfs.src(source, {base: config._SOURCE_ROOT})
        .pipe(pngquant({quality: '65-80', speed: 4})())
        .pipe(vfs.dest(config._DEST_ROOT))
        .on('end', callback);
};
Processor.copy = function (config, input, callback) {
    callback = callback || function() {};
    let source = input || config.assets;

    vfs.src(source, {base: config._SOURCE_ROOT})
        .pipe(vfs.dest(config._DEST_ROOT))
        .on('end', callback);
};

function getSources(input, config) {
    let globOption = { nodir: true };

    let sources = {
        uglify: [],
        sass: [],
        nunjucks: [],
        imagemin: [],
        copy: []
    };
    let targets = null;

    if (!input) {
        return  {
            uglify  : config.scripts.concat(config.globalIgnore),
            sass    : config.styles.concat(config.globalIgnore),
            nunjucks: config.templates.concat(config.globalIgnore),
            imagemin: config.images.concat(config.globalIgnore),
            copy    : config.assets.concat(config.globalIgnore)
        };
    }

    if (isGlob(input)) {
        targets = _.concat([input], config.globalIgnore);
    } else if (utils.isDir(input)) {
        targets = _.concat([input + '/**'], config.globalIgnore);
    }

    let files = globby.sync(targets, globOption);

    files.forEach(f => sources[utils.getProcessor(f)].push(f));
    return sources;
}

function build(config, input, callback) {
    // npm run build
    // npm run build app/path/to/dir
    // npm run build app/path/**/*.js
    if (!input || isGlob(input) || utils.isDir(input)) {
        let s = getSources(input, config);
        let tasks = [];

        // 开发环境复制脚本、图片、测试到本地服务器
        if (config._isDev) {
            s.copy = _.concat(s.uglify, config.assets, s.copy);
        }

        if (s.uglify.length && config._isPrd) {
            tasks.push(cb => Processor.uglify(config, s.uglify, cb));
        }
        if (s.sass.length) {
            tasks.push(cb => Processor.sass(config, s.sass, cb));
        }
        if (s.imagemin.length) {
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
    } else if (utils.isFile(input))  {
        // npm run build app/path/to/file.js
        Processor[utils.getProcessor(input)](config, input)
    }
}

module.exports = function (config, input, callback) {
    input = input || config._arg._[1];
    callback = callback || function() {};

    let cmd = config._arg;

    rimraf.sync(config.dest);

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
    if (!input) {
        async.series([
            cb => Sprite(config, cb),
            cb => build(config, input, cb)
        ], function(err) {
            if (err) return console.log(err);
            callback();
        });
    } else {
        build(config, input, callback);
    }
};

module.exports.Processor = Processor;