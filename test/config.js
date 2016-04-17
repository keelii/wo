'use strict';

function getTagName() {
    let now = new Date();
    return `RELEASE/${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}/${now.getHours()}-${now.getMinutes()}`;
}

module.exports = {
    name: 'project_name',
    version: '0.0.0',

    production: '//your.domain.com/cdn-path/',

    banner: '',
    scripts: ['app/components/**/*.js'],
    styles: ['app/components/**/*.scss'],
    images: ['app/components/**/i/*.+(|jpg|png|gif)'],
    templates: ['app/views/*.html'],
    sprites: {
        cssName: '__sprite.scss',
        imgName: 'i/__sprite.png',
        items: [
            'app/components/main/**/sprite-*.png',
            'app/components/footer/**/sprite-*.png'
        ]
    },

    uglify: {
        mangle: {
            except: ['define', 'require', 'module', 'exports']
        }
    },
    cleanCSS: {},
    pngquant: {
        quality: '80-90',
        speed: 4
    },

    source: 'app',
    view: 'views',
    component: {
        dir: 'components',
        config: 'config.js',
        test: '.test.html'
    },
    templateRefs:  ['app/components/*/*.html', 'app/views/*/*.html'],

    tests: ['app/tests/**'],
    assets: ['app/components/**/*.cur'],
    globalIgnore: ['!app/components/*/config.js'],
    watchIgnore: /\/maco\/|\/layout\/|config\.js|node_modules/,

    dest: 'build',

    server: {
        dir: '.www',
        port: 2048,
        index: false
    },

    deploy: {
        host: '127.0.0.1',
        user: 'ftpuser',
        password: 'ftppass',
        parallel: 5,
        src: 'build/**',
        dest: './'
    },

    release: {
        cmds: [
            `ls`
        ]
    },

    nolog: false
};
