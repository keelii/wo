'use strict';

const fs = require('fs');
const path = require('path');
const util = require('util');


function copyFile(src, dest) {
    let basename = path.basename(src);
    let destname = path.join(dest, basename);

    console.log(basename);
    console.log(destname);
    fs.writeFileSync(destname, fs.readFileSync(src));
}

function copyDir(src, dest, callback) {
    if (!fs.existsSync(src)) {
        return callback(util.format('Source dir is not exists. [%s]', src));
    }

    console.log('[MAKED: %s]', dest);
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest);
    }

    const destDirname = path.join(dest, path.basename(src));

    const files = fs.readdirSync(src);

    files.forEach(function (file) {
        let filename = path.join(src, file);

        if (fs.lstatSync(filename).isDirectory()) {
            copyDir(filename, destDirname);
        } else {
            console.log('[File => %s]\n[Dest => %s]\n', filename, destDirname);

            copyFile(filename, destDirname);
        }
    });
}

module.exports = function (config) {

    //copyDir(
    //    path.join(config._WO_ROOT, 'boilerplate'),
    //    path.join(process.cwd(), 'proj')
    //);
};