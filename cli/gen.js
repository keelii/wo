'use strict';
const path = require('path');
const fse = require('fs-extra');
const chalk = require('chalk');

module.exports = function (config, pName, callback) {
    pName = pName || config._arg._[1] || 'project';

    fse.copy(
        path.join(config._WO_ROOT, 'boilerplate'),
        path.join(process.cwd(), pName),
        function (err) {
            if (err) {
                return callback(err);
            }

            if (!config.nolog) {
                console.log('Project [%s] has created. take look:\n ', pName);
                console.log(chalk.green(`  $ cd ${pName} && wo start`));
            }
            callback(null);
        }
    );

};