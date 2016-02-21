# Wooo

[![Build Status](https://travis-ci.org/keelii/wo.svg?branch=master)](https://travis-ci.org/keelii/wo)
[![codecov.io](https://codecov.io/github/keelii/wo/coverage.svg?branch=master)](https://codecov.io/github/keelii/wo?branch=master)

#### Wooo, it's really awesome.

```
┬ ┬╔═╗╔═╗╔═╗
│││║ ║║ ║║ ║
└┴┘╚═╝╚═╝╚═╝
```
## Install globally

> npm install wooo -g

## Bundled with npm scripts

> npm install wooo --save-dev

```
scripts: {
    "start": "node ./index start",
    "build:sprite": "node ./index build --sprite",
    "build:uglify": "node ./index build --uglify",
    "build:sass": "node ./index build --sass",
    "build:nunjucks": "node ./index build --nunjucks",
    "release": "node ./index release",
    "deploy": "node ./index deploy",
    "clear": "node ./index clear"
}
```