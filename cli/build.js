'use strict';
const vfs = require('vinyl-fs');
const Uglify = require('../lib/uglify');
const Sass = require('../lib/sass');
const Nunjucks = require('../lib/nunjucks');
const Component = require('../lib/component');
const Sprite = require('../lib/sprite');
const rebasePath = require('../lib/rebasePath');

const glob = require('glob');
const isGlob = require('is-glob');
const utils = require('../lib/utils');

function getSources(config, input) {
    let files = [];
    let scripts = [];
    let styles = [];
    let templates = [];
    let images = [];

    if (!input) {
        files = glob.sync(config._SOURCE_ROOT + '/**');
    } else if (isGlob(input)) {
        files = glob.sync(input);
    } else if (utils.isDir(input)) {
        files = glob.sync(input + '/**');
    } else {
        return null;
    }

    files.forEach((f) => {
        if (utils.isJS(f)) {
            scripts.push(f);
        } else if (utils.isSass(f)) {
            styles.push(f);
        } else if (utils.isTemplate(f)) {
            templates.push(f);
        }  else if (utils.isImage(f)) {
            images.push(f);
        }
    });
    return { scripts, styles, templates, images };
}

function uglify(config, input, callback) {
    let scripts = input || config.scripts;
    let stream = vfs.src(scripts,
        { base: config._SOURCE_ROOT});

    if (config._isPrd) {
        stream.pipe(Uglify({}));
    }

    stream.pipe(vfs.dest(config._DEST_ROOT));
    stream.on('end', callback);
}
function sass(config, input, callback) {
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
}
function nunjucks(config, input, callback) {
    let templates = input || config.templates;
    let stream = vfs.src(templates,
        { base: config._SOURCE_ROOT});

    // if (config._isDev) {
        stream.pipe(Component(config));
        stream.pipe(Nunjucks(config));
    // }

    stream.pipe(vfs.dest(config._DEST_ROOT));
    stream.on('end', callback);
}
function copy(config, input, callback) {
    let images = input || config.images;
    let stream = vfs.src(images,
        { base: config._SOURCE_ROOT});

    stream.pipe(vfs.dest(config._DEST_ROOT));
    stream.on('end', callback);
}

function build(config, input, callback) {
    // npm run build
    // npm run build app/path/to/dir
    // npm run build app/path/**/*.js
    if (!input || isGlob(input) || utils.isDir(input)) {
        let s = getSources(config, input);
        let complate = 0;

        if (s.scripts.length) {
            uglify(config, s.scripts, function() {
                console.log('uglify');
            });
        }
        if (s.styles.length) {
            sass(config, s.styles, function() {
                console.log('sass');
            });
        }
        if (s.templates.length) {
            nunjucks(config, s.templates, function() {
                console.log('nunjucks');
            });
        }
        if (s.images.length) {
            copy(config, s.images, function() {
                console.log('copy');
            });
        }
    } else if (utils.isFile(input))  {
        // npm run build app/path/to/file.js
        if (utils.isJS(input)) {
            uglify(config, input, callback);
        }
        if (utils.isSass(input)) {
            sass(config, input, callback);
        }
        if (utils.isTemplate(input)) {
            nunjucks(config, input, callback);
        }
        if (utils.isImage(input)) {
            copy(config, input, callback);
        }
    }
}

module.exports = function (config, input, callback) {
    input = input || config._arg._[1];
    callback = callback || function() {};

    // npm run build:s => build --sprite
    if (config._arg.sprite) {
        Sprite(config, function () {
            build(config, input);
        });
    } else {
        build(config, input, callback);
    }
};