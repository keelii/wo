'use strict';
const Spritesmith = require('spritesmith');
const path = require('path');
const fs = require('fs');
const utils = require('./utils');

function sprite(config) {
    let sprites = [
        'app/components/main/i/sprite-1.png',
        'app/components/main/i/sprite-2.png',
        'app/components/main/i/sprite-3.png'
    ];

    function generateCSS(sprites) {
        let cssText = '';
        let cssPath = null;

        for (let sName in sprites) {
            if (sprites.hasOwnProperty(sName)) {
                let rPath = path.relative(config._SOURCE_ROOT, sName);
                let basename = path.basename(rPath, '.png');
                let dirname = path.dirname(rPath);
                let coordinate = sprites[sName];

                cssPath = utils.dirToPath(path.join(dirname, '__sprite.png'));

                let cssTemplate = `
                    .${basename} {
                        width: ${coordinate.width}px;
                        height: ${coordinate.height}px;
                        background-image: url(/${cssPath});
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
        }
    }

    Spritesmith.run({src: sprites}, handleResult);
}

module.exports = sprite;