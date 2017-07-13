'use strict'

//引入hello模块
var greet = require('./hello').greet;//当前目录用 .
var x =  require('./hello').x;
//如果只写模块名很可能出错
var s = 'Mike';
console.log(s);//不同模块的相同变量互不影响
greet(s);
console.log(x);

if(typeof(window)){//判断js执行环境  node的全局变量是global  浏览器的是window
    console.log("node.js")
}
else{
    console.log("browser")
}