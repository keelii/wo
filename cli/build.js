'use strict';
const path = require('path');

const fse = require('fs-extra');
const async = require('async');
const globby = require('globby');
const Processor = require('../lib/index');

const _ = require('lodash');
const utils = require('../lib/utils');
const chalk = require('chalk');

function getSources (config, input) {
    let files = null, targets = null;
    let sources = {
        uglify: [],
        sass: [],
        nunjucks: [],
        imagemin: [],
        copy: []
    };

    function logTarget(text) {
        if (!config.nolog) {
            console.log(`Targets [${chalk.green(text)}] will be processing...`);
        }
    }

    if (input) {
        if (utils.isDir(input)) {
            targets = path.join(input, '/**');
            files = getGlobFiles(targets, config);
        }
        if (utils.isGlob(input)) {
            targets = input;
            files = getGlobFiles(input, config);
        }
        // for watch task
        if (utils.isArray(input)) {
            targets = input.join(',');
            files = input;
        }
        // wo build component_name1,component_name2
        if (utils.isMultiTarget(input)) {
            targets = input.split(',')
                .filter(inp => utils.hasDir(inp, config._COMPONENT_ROOT))
                .map(inp => path.join(config._COMPONENT_ROOT, inp, '/**'));

            files = getGlobFiles(targets, config);

            logTarget(targets.map(t => utils.relativeDir(t)).join(','));
        }
        // wo build component_name
        if (utils.hasDir(input, config._COMPONENT_ROOT)) {
            targets = path.join(config._COMPONENT_ROOT, input, '/**');
            files = getGlobFiles(targets, config);

            logTarget(utils.relativeDir(targets));
        }

        if (files) {
            // exinclude component config
            files.filter(f => f.indexOf('config.js') < 0)
                .forEach(f => sources[utils.getProcessor(f)].push(f));
        } else {
            throw new Error(`Targets [${chalk.red(input)}] not found.`);
        }
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
    var globs = [];

    if (utils.isArray(glob)) {
        globs = glob.concat(config.globalIgnore);
    }
    if (typeof glob === 'string') {
        globs = [glob].concat(config.globalIgnore);
    }
    return globby.sync(globs, { nodir: true });
}

function build(config, input, callback) {
    if (config._showLog) {
        console.time('uglify');
        console.time('sass');
        console.time('imagemin');
        console.time('nunjucks');
        console.time('copy');
    }

    if (utils.isFile(input)) {
        if (!utils.isNormalFile(input)) {
            return callback('input not validated');
        }

        return Processor[utils.getProcessor(input)](config, input, callback);
    }

    let s = getSources(config, input);
    let tasks = [];

    // 开发环境复制脚本、图片、测试到本地服务器
    if (config._isDev) {
        s.copy = _.concat(config.scripts, config.images, config.assets, s.copy);
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
        if (config._isDev || config._arg.nunjucks) {
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
        return Processor.sprite(config, callback);
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
module.exports.build = build;
module.exports.getSources = getSources;
module.exports.getGlobFiles = getGlobFiles;

