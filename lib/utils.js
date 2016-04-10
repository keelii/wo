'use strict';
const path = require('path');
const fs = require('fs');
const isGlob = require('is-glob');

function ask(question, callback) {
    var stdin = process.stdin, stdout = process.stdout;

    var format = /.+/;

    stdin.resume();
    stdout.write(question + ": ");

    stdin.once('data', function(data) {
        data = data.toString().trim();

        if (format.test(data)) {
            callback(data);
        } else {
            stdout.write("It should match: "+ format +"\n");
            ask(question, format, callback);
        }
    });
}

module.exports = {
    cmdMap: {
        "s":"start",   "start":"start",
        "b":"build",   "build":"build",
        "d":"deploy",  "deploy":"deploy",
        "r":"release", "release":"release",
        "g":"gen",     "gen": "gen",
        "c":"clear",   "clear":"clear"
    },
    isArray: function (arr) {
        return Array.isArray(arr);
    },
    isMultiTarget: function (input) {
        return typeof input === 'string' && input.indexOf(',') > -1;
    },
    getProcessor: function(filename) {
        if (this.isJS(filename)) {
            return 'uglify';
        } else if (this.isSass(filename)) {
            return 'sass';
        } else if (this.isTemplate(filename)) {
            return 'nunjucks';
        } else if (this.isImage(filename)) {
            return 'imagemin';
        } else {
            return 'copy';
        }
    },
    isJS: function(str) {
        return /\.js$/.test(str);
    },
    isSass: function(str) {
        return /\.scss|sass$/.test(str);
    },
    isTemplate: function(str) {
        return /\.html|htm$/.test(str);
    },
    isImage: function(str) {
        return /\.png|gif|jpg$/.test(str);
    },
    isNormalFile: function (str) {
        return /\.html|htm|js|scss|sass|png|gif|jpg|cur$/.test(str);
    },

    hasContents: function (file) {
        if (this.exists(file)) {
            return fs.readFileSync(file, 'utf8') !== '';
        } else {
            return false;
        }
    },
    hasDir: function (dir, parent) {
        var dirs = fs.readdirSync(parent);

        return dirs && parent && dirs.indexOf(dir) > -1;
    },
    exists: function(file) {
        return fs.existsSync(file);
    },
    isGlob: function (f) {
        return isGlob(f);
    },
    isFile: function(filename) {
        try {
            return fs.lstatSync(filename).isFile();
        } catch (err) {
            return false;
        }
    },
    isDir: function(filename) {
        try {
            return fs.lstatSync(filename).isDirectory();
        } catch (err) {
            return false;
        }
    },

    fileName: function (file) {
        return path.basename(file);
    },
    relativeDir: function (dir) {
        return path.relative(process.cwd(), dir);
    },
    dirToPath: function(dir) {
        return dir.replace(/\\/g, '/');
    },
    isAbsUrl: function (url) {
        return /^http:|https:|\/\//.test(url);
    },
    isDataUri: function (url) {
        return /^data:image/.test(url);
    },

    getTag: function (tagname) {
        switch (tagname) {
            case 'link':
                return '<link type="text/css" rel="stylesheet" href="{{source}}" />';
            case 'script':
                return '<script src="{{source}}"></script>';
            default:
                return '<'+ tagname +'></'+ tagname +'>'
        }
    },

    getTagName: function () {
        let now = new Date();
        return `RELEASE/${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}/${now.getHours()}-${now.getMinutes()}`;
    }
};
module.exports.ask = ask;
