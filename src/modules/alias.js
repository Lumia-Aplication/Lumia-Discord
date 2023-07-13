const path = require('path');
const alias = require('module-alias');

const srcPath = path.resolve('src');

alias.addAlias('@lumia', srcPath);

module.exports = alias;
