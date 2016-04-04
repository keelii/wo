'use strict';
const path = require('path');
const fse = require('fs-extra');
const chalk = require('chalk');

module.exports = function (config, pName, callback) {
    callback = callback || function(){};
    pName = pName || config._arg._[1] || 'project';
    
    if (config._arg.currdir) {
        pName = './';
    }
    
    fse.copy(
        path.join(config._WO_ROOT, 'boilerplate'),
        path.join(process.cwd(), pName),
        function (err) {
            if (err) {
                return callback(err);
            }

            if (!config.nolog) {
                console.log('\nProject [%s] has created. take look:\n ', pName);
                console.log(chalk.green(`  $ cd ${pName} && wo start`));
            }
            callback(null);
        }
    );
};
