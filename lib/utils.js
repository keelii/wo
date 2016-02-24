'use strict';
const path = require('path');
const fs = require('fs');

module.exports = {
    cmdMap: {
        "s":"start",   "start":"start",
        "b":"build",   "build":"build",
        "d":"deploy",  "deploy":"deploy",
        "r":"release", "release":"release",
        "g":"gen",     "gen": "gen",
        "c":"clear",   "clear":"clear"
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

    hasContents: function (file) {
        if (this.exists(file)) {
            return fs.readFileSync(file, 'utf8') !== '';
        } else {
            return false;
        }
    },
    exists: function(file) {
        return fs.existsSync(file);
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

    relativeDir: function (dir) {
        return path.relative(process.cwd(), dir);
    },
    dirToPath: function(dir) {
        dir = path.normalize(dir);
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
    }
};
