'use strict';
const Spritesmith = require('spritesmith');
const path = require('path');
const fs = require('fs');

const glob = require('glob');
const utils = require('./utils');

function sprite(config, sprites, callback) {
    callback = callback || function() {};

    function generateCSS(sprites) {
        let cssText = '';
        let cssPath = null;

        for (let sName in sprites) {
            if (sprites.hasOwnProperty(sName)) {
                let rPath = path.relative(config._SOURCE_ROOT, sName);
                let basename = path.basename(rPath, '.png');
                let dirname = path.dirname(rPath);
                let coordinate = sprites[sName];
                let bgPath = config.sprites.imgName;

                cssPath = utils.dirToPath(path.join(dirname, config.sprites.cssName));

                let cssTemplate = `
                    .${basename} {
                        width: ${coordinate.width}px;
                        height: ${coordinate.height}px;
                        background-image: url(${bgPath});
                        background-position: -${coordinate.x}px -${coordinate.y}px;
                    }`;

                cssText += cssTemplate;
            }
        }

        return { cssText, cssPath };
    }

    function generate(p, buf) {
        let filename = path.join(config._SOURCE_ROOT, p);
        try {
            fs.writeFileSync(filename, buf);
        } catch (error) {
            console.error('Generate sprite file error [%s].', p);
            console.error(error);
        }
    }

    function handleResult (err, result) {
        if (err) {
            return console.error(err);
        }

        if (result.coordinates) {
            let res = generateCSS(result.coordinates);
            let cssPath = path.join(res.cssPath, '../../', '__sprite.scss');
            generate(res.cssPath, result.image);
            generate(cssPath, res.cssText);

            callback(null);
        }
    }

    Spritesmith.run({src: sprites}, handleResult);
}

module.exports = function (config, callback) {
    let items = config.sprites.items.reduce(item => {
        let files = glob.sync(item);
        if (files.length) {
            return [files];
        }
    });

    let count = 0;
    items.forEach(function (imgs) {
        sprite(config, imgs, function (err) {
            if (err) {
                return console.error(err);
            }

            if (count >= items.length) {
                callback(null);
            }
        });
    });
};