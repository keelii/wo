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
    let source = {
        scripts: [],
        styles: [],
        templates: [],
        images: []
    };

    if (!input) {
        files = glob.sync(config._SOURCE_ROOT + '/**');
    } else if (isGlob(input)) {
        files = glob.sync(input);
    } else if (utils.isDir(input)) {
        files = glob.sync(input + '/**');
    } else {
        return source;
    }

    files.forEach((f) => {
        if (utils.isJS(f)) {
            source.scripts.push(f);
        } else if (utils.isSass(f)) {
            source.styles.push(f);
        } else if (utils.isTemplate(f)) {
            source.templates.push(f);
        }  else if (utils.isImage(f)) {
            source.images.push(f);
        }
    });
    return source;
}

function uglify(config, input) {
    let scripts = input || config.scripts;
    let stream = vfs.src(scripts,
        { base: config._SOURCE_ROOT});

    if (config._isPrd) {
        stream.pipe(Uglify({
            exclude: 'define'
        }));
    }

    stream.pipe(vfs.dest(config._DEST_ROOT));
}
function sass(config, input) {
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
}
function nunjucks(config, input) {
    let styles = input || config.templates;
    let stream = vfs.src(styles,
        { base: config._SOURCE_ROOT});

    // if (config._isDev) {
        stream.pipe(Component(config));
        stream.pipe(Nunjucks(config));
    // }

    stream.pipe(vfs.dest(config._DEST_ROOT));
}
function copy(config, input) {
    let images = input || config.images;
    let stream = vfs.src(images,
        { base: config._SOURCE_ROOT});

    stream.pipe(vfs.dest(config._DEST_ROOT));
}

function build(config) {
    const input = config._arg._[1];

     Sprite(config);

    // npm run build
    // npm run build app/path/to/dir
    // npm run build app/path/**/*.js

    if (!input || isGlob(input) || utils.isDir(input)) {
        let s = getSources(config, input);

        if (s.scripts.length) {
            uglify(config, s.scripts);
        }
        if (s.styles.length) {
            sass(config, s.styles);
        }
        if (s.templates.length) {
            nunjucks(config, s.templates);
        }
        if (s.images.length) {
            copy(config, s.images);
        }
    } else if (utils.isFile(input))  {
        // npm run build app/path/to/file.js
        if (utils.isJS(input)) {
            uglify(config, input);
        }
        if (utils.isSass(input)) {
            sass(config, input);
        }
        if (utils.isTemplate(input)) {
            nunjucks(config, input);
        }
        if (utils.isImage(input)) {
            copy(config, input);
        }
    }
}

module.exports = build;