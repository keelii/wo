# Wooo

[![Wooo Version](https://img.shields.io/npm/v/wooo.svg)](https://www.npmjs.com/package/wooo)
[![Build Status](https://travis-ci.org/keelii/wo.svg?branch=master)](https://travis-ci.org/keelii/wo)
[![codecov.io](https://codecov.io/github/keelii/wo/coverage.svg?branch=master)](https://codecov.io/github/keelii/wo?branch=master)
[![dependencies up to date](https://david-dm.org/keelii/wo.svg)](https://david-dm.org/keelii/wo)
[![License](https://img.shields.io/npm/l/wooo.svg)](https://www.npmjs.com/package/wooo)

A FE Build tool with easy cli.

```
┬ ┬╔═╗╔═╗╔═╗
│││║ ║║ ║║ ║
└┴┘╚═╝╚═╝╚═╝
```

## Requirement

> "node" : ">=4.0.0"

## Install globally

> npm install wooo -g

```
Usage: wo <command> <input> <options>

command:
  build     - clear && build all source files to dest
  deploy    - build && upload to ftp server
  release   - build && taged git source
  start     - build && start a local server with default root [.www]
  clear     - by default, rm -rf build .www
  gen       - generate a new demo project

input:
  path/to/dir
  glob/pattern/**
  path/to/file.ext
  gen_project_name

options:
  --sprite      - concat sprites to one image and generate a style file
  --nunjucks    - compile nunjucks to html
  --uglify      - compress scripts
  --imagemin    - optimize images
  --sass        - compile sass to css
  --debug       - build uncompressed js file
  --force       - deploy file with no cache
  --currdir     - generate demo project file to current directory
```

## Bundled with npm scripts

> npm install wooo --save-dev

```
"scripts": {
    "start": "node ./node_modules/wooo start",
    "build": "node ./node_modules/wooo build",
    "build:sprite": "node ./node_modules/wooo build --sprite",
    "deploy": "node ./node_modules/wooo deploy",
    "release": "node ./node_modules/wooo release",
    "clear": "node ./node_modules/wooo clear",
    "gen": "node ./node_modules/wooo gen"
}
```
