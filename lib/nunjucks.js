'use strict';
const path = require('path');
const map = require('map-stream');
const nunjucks = require('nunjucks');
const utils = require('./utils');
const _ = require('lodash');

function Nunjucks(file, option, cb) {
    let result = '';

    try {
        result = option._env.render(file.path, {
            _components: option._components[file.path]
        });
    } catch (error) {
        console.log('Template render error.\n');
        console.error(error);
    }

    file.contents = new Buffer(result);
    cb(null, file);
}

/**
 * 添加内置过滤器
 */
function addFilters(env, config) {
    /**
     * exclude 过滤器
     *  {{ _components | exclude('main', 'footer') | source('style') }}
     */
    env.addFilter('exclude', function() {
        let args = Array.prototype.slice.call(arguments);
        let components = args.shift();
        let result = {};

        for ( let c in components ) {
            //console.log('--%s-%s--', args, components[c]['name']);
            if ( args.indexOf( components[c]['name'] ) < 0 ) {
                result[c] = components[c];
            }
        }

        return result;
    });

    /**
     * Get component resources
     *  {{ _components | source('link') }}
     *  {{ _components | source('script') }}
     */
    env.addFilter('source', function(components, type) {
        let paths = [];
        let EXT = type === 'link' ? '.scss' : '.js';
        let prefix = path.relative(config.source, process.cwd());

        let tag = utils.getTag(type);

        for ( let c in components ) {
            let filename = path.join(config.source, c + EXT);

            if ( utils.hasContents(filename) ) {
                paths.push(utils.dirToPath(path.join(prefix, c + EXT.replace('.scss', '.css'))));
            }
        }
        let result = paths.map(function(r) {
            return tag.replace('{{source}}', r);
        });
        let resultCombo = paths.map(function(r) {
            return path.join(config.view, r).replace(config.component.dir, '');
        });

        let comboPath = path.join(
            config.production,
            config._PRD_PREFIX,
            config.component.dir,
            '??',
            resultCombo.join(',')
        );

        return config._isPrd
            ? tag.replace('{{source}}', utils.dirToPath(comboPath))
            : result.join('\n');
    });
}

/**
 * 转换手动引用的资源路径
 * {{ Tag('tagname', relative_path) }}
 * return
 *  <script src"production_path"></script>
 *  <link rel="stylesheet" type="text/css" href="production_path" />
 */
function addGlobals(env, config) {
    function getProductionPath(source) {
        var result = source;

        if (config._isPrd) {
            var productionPath = path.join(
                config.production,
                config._PRD_PREFIX,
                source
            );

            result = utils.dirToPath(productionPath);
        }

        return result;
    }
    env.addGlobal('Tag', function (tagname, source) {
        return utils.getTag(tagname)
            .replace('{{source}}', getProductionPath(source));
    });
}

/**
 * 添加自定义标签
 */
function addExtensions(env, config) {
    /**
     * {% setGlobal key="val" %}
     */
    var SetGlobalTag = function() {
        this.tags = ['setGlobal'];

        this.parse = function(parser, nodes, lexer) {
            var token = parser.nextToken();

            var args = parser.parseSignature(null, true);
            parser.advanceAfterBlockEnd(token.value);

            return new nodes.CallExtension(this, 'run', args);
        };

        this.run = function(context, values) {
            for ( var key in values ) {
                if ( values.hasOwnProperty(key) && key !== '__keywords' ) {
                    env.addGlobal(key, values[key]);
                }
            }
            return '';
        };
    };
    /**
     * {% component 'name' {title: 'Example', subtitle: 'An example component'} %}
     */
    var ComponentTag = function() {
        this.tags = ['component'];

        this.parse = function(parser, nodes, lexer) {
            var token = parser.nextToken();

            var args = parser.parseSignature(null, true);
            parser.advanceAfterBlockEnd(token.value);

            return new nodes.CallExtension(this, 'run', args);
        };

        this.run = function(context, name, data) {
            var cPath = `components/${name}/${name}.html`;

            var mergedData = _.defaultsDeep(data, getComponentData(cPath, config));
            return env.render(cPath, mergedData);
        };
    };

    env.addExtension('component', new ComponentTag());
    env.addExtension('setGlobal', new SetGlobalTag());
}

/**
 * 获取组件数据
 */
function getComponentData(cName, config) {
    let cfgPath = path.join(config._SOURCE_ROOT,
        path.dirname(cName),
        config.component.config);

    let data = {};

    if (utils.hasContents(cfgPath)) {
        data = require(cfgPath).data;
    }
    // clear node module cache.
    delete require.cache[cfgPath];
    return data;
}


module.exports = function(option) {
    option._env = nunjucks.configure(option._SOURCE_ROOT, {
        autoescape: false,
        noCache: true,
        trimBlocks: true,
        lstripBlocks: true
    });

    addExtensions(option._env, option);
    addFilters(option._env, option);
    addGlobals(option._env, option);

    return map(function(file, cb) {
        Nunjucks(file, option, cb);
    });
};
