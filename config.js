'use strict'
//读取配置时  我们用config.js实现不同环境读取不同的配置环境
const defaultConfig = './config-default.js';
const overrideConfig = './config-override.js';
const testConfig = './config-test.js';
const fs = require('fs');
var config = null;

if(process.env.NODE_ENV === 'test'){
    console.log(`Load ${testConfig}...`);
    config = require(testConfig);
}else{
    console.log(`Load ${defaultConfig}...`);
    config = require(defaultConfig);
    try{
        if(fs.statSync(overrideConfig).isFile()){
            console.log(`Load ${overrideConfig}...`);
            config = Object.assign(config,require(overrideConfig));
        }
    }catch(err){
        console.log(`Cannot load ${overrideConfig}`);
    }
}
module.exports = config;
//先读取config-default.js
//如果不是测试环境就读取config-override.js
//如果是测试环境 就读取config-test.js
