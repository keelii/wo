'use strict';
const vfs = require('vinyl-fs');

const Uglify = require('./uglify');
const Sass = require('./sass');
const Nunjucks = require('./nunjucks');
const Component = require('./component');
const Sprite = require('./sprite');
const pngquant = require('./pngquant');
const rebasePath = require('./rebasePath');
const cleanCSS = require('./cleanCSS');
const banner = require('./banner');

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
            debug: nocompressed }))
        .pipe(cleanCSS(config.cleanCSS))
        .pipe(rebasePath({
            enabled: config._isPrd,
            base: config._SOURCE_ROOT,
            prefix: config.production + config._PRD_PREFIX }))
        .pipe(banner({
            enabled: config._isPrd,
            template: config.banner }))
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
Processor.sprite = Sprite;

function handleCallback(name, config, callback) {
    return function() {
        if (config._showLog) {
            console.timeEnd(name);
        }
        callback();
    };
}

module.exports = Processor;
