'use strict';
const Spritesmith = require('spritesmith');
const path = require('path');
const fs = require('fs');

const async = require('async');
const globby = require('globby');
const utils = require('./utils');

function sprite(config, sprites, callback) {
    callback = callback || function() {};

    function generateCSS(sprites) {
        let cssText = '';
        let imgPath = null;

        for (let sName in sprites) {
            if (sprites.hasOwnProperty(sName)) {
                let rPath = path.relative(config._SOURCE_ROOT, sName);
                let basename = path.basename(rPath, '.png');
                let dirname = path.dirname(rPath);
                let coordinate = sprites[sName];
                let bgPath = config.sprites.imgName + '?v=' + (+new Date);

                imgPath = utils.dirToPath(path.join(dirname, '../', config.sprites.imgName));

                let cssTemplate = `
                    @mixin ${basename} {
                        width: ${coordinate.width}px;
                        height: ${coordinate.height}px;
                        background-image: url(${bgPath});
                        background-position: -${coordinate.x}px -${coordinate.y}px;
                    }`;

                cssText += cssTemplate;
            }
        }

        return { cssText, imgPath };
    }

    function generate(p, buf) {
        let filename = path.join(config._SOURCE_ROOT, p);
        try {
            fs.writeFileSync(filename, buf);
        } catch (err) {
            callback(err);
        }
    }

    function handleResult (err, result) {
        if (err) return callback(err);

        if (result.coordinates) {
            let res = generateCSS(result.coordinates);
            let cssPath = path.join(res.imgPath, '../../', config.sprites.cssName);

            generate(res.imgPath, result.image);
            generate(cssPath, res.cssText);

            callback(null);
        }
    }

    Spritesmith.run({src: sprites}, handleResult);
}

module.exports = function (config, callback) {
    let items = [];

    if (config._showLog) {
        console.time('sprite');
    }

    if (config.sprites.items.length) {
        config.sprites.items.forEach(item => {
            let files = globby.sync(item);
            if (files.length) {
                items.push(files);
            }
        });
    } else {
        return callback(null);
    }

    let tasks = [];

    if (items && items.length) {
        items.forEach((imgs) => tasks.push(cb => sprite(config, imgs, cb)));
        async.series(tasks, function () {
            if (config._showLog) {
                console.timeEnd('sprite');
            }
            callback();
        });
    } else {
        callback(null);
    }
};
