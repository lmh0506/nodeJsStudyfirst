'use strict'
require('babel-core/register')({
    presets:['stage-3']
});

const model = require('./model.js');
model.sync();

Console.log('init db ok');
process.exit(0);