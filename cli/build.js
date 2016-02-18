'use strict';
const vfs = require('vinyl-fs');
const Uglify = require('../lib/uglify');
const Sass = require('../lib/sass');
const Nunjucks = require('../lib/nunjucks');
const Component = require('../lib/component');
const Sprite = require('../lib/sprite');
const rebasePath = require('../lib/rebasePath');

const async = require('async');
const globby = require('globby');
const isGlob = require('is-glob');
const utils = require('../lib/utils');
const _ = require('lodash');

function getSources(input, config) {
    let files = [];
    let globOption = { nodir: true };

    let sources = {
        uglify: [],
        sass: [],
        nunjucks: [],
        copy: []
    };

    if (!input) {
        return {
            uglify: config.scripts,
            sass: config.styles,
            nunjucks: config.templates,
            copy: config.images
        }
    } else if (isGlob(input)) {
        let target = _.concat([input], config.globalIgnore);
        files = globby.sync(target, globOption);
    } else if (utils.isDir(input)) {
        let target = _.concat([input + '/**'], config.globalIgnore);
        files = globby.sync(target, globOption);
    } else {
        throw new Error('Unexpected command.');
    }

    files.forEach(f => sources[utils.getProcessor(f)].push(f));
    console.log(sources);
    return sources;
}

let Processor = {};
Processor.uglify = function (config, input, callback) {
    callback = callback || function() {};
    let scripts = input || config.scripts;
    let stream = vfs.src(scripts,
        { base: config._SOURCE_ROOT});

    //if (config._isPrd) {
        stream.pipe(Uglify({
            mangle: {
                except: ['define', 'require', 'module', 'exports']
            }
        }));
    //}

    stream.pipe(vfs.dest(config._DEST_ROOT));
    stream.on('end', callback);
};
Processor.sass = function (config, input, callback) {
    callback = callback || function() {};
    let styles = input || config.styles;
    let stream = vfs.src(styles,
        { base: config._SOURCE_ROOT});

    stream.pipe(Sass());

    if (config._isPrd) {
        stream.pipe(rebasePath({
            base: config._SOURCE_ROOT,
            prefix: config.production
        }));
    }

    stream.pipe(vfs.dest(config._DEST_ROOT));
    stream.on('end', callback);
};
Processor.nunjucks = function (config, input, callback) {
    callback = callback || function() {};
    let templates = input || config.templates;
    let stream = vfs.src(templates,
        { base: config._SOURCE_ROOT});

    // if (config._isDev) {
        stream.pipe(Component(config));
        stream.pipe(Nunjucks(config));
    // }

    stream.pipe(vfs.dest(config._DEST_ROOT));
    stream.on('end', callback);
};
Processor.copy = function (config, input, callback) {
    callback = callback || function() {};
    let images = input || config.images;
    let stream = vfs.src(images,
        { base: config._SOURCE_ROOT});

    stream.pipe(vfs.dest(config._DEST_ROOT));
    stream.on('end', callback);
};

function build(config, input, callback) {
    // npm run build
    // npm run build app/path/to/dir
    // npm run build app/path/**/*.js
    if (!input || isGlob(input) || utils.isDir(input)) {
        let s = getSources(input, config);
        let tasks = [];

        for (let key in s) {
            //console.log('KEY: %s | VAL: %s', key, s[key]);
            if (s[key].length) {
                tasks.push(function(cb) {
                    Processor[key](config, s[key], cb);
                });
            }
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

    // npm run build:s => build --sprite
    if (config._arg.sprite) {
        Sprite(config, function () {
            build(config, input, callback);
        });
    } else {
        build(config, input, callback);
    }
};