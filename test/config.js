module.exports = {
    name: 'project_name',
    version: '0.0.0',

    production: '//your.domain.com/cdn-path/',

    banner: '',
    scripts: ['test/app/components/**/*.js'],
    styles: ['test/app/components/**/*.scss'],
    images: ['test/app/components/**/i/*.+(|jpg|png|gif)'],
    templates: ['test/app/views/*.html'],
    sprites: {
        cssName: '__sprite.scss',
        imgName: 'i/__sprite.png',
        items: [
            'test/app/components/main/**/sprite-*.png',
            'test/app/components/footer/**/sprite-*.png'
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
    templateRefs:  ['test/app/components/*/*.html', 'test/app/views/*/*.html'],

    tests: ['test/app/tests/**'],
    assets: ['test/app/components/**/*.cur'],
    globalIgnore: ['!test/app/components/*/config.js'],
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
    nolog: false
};
