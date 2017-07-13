'use strict'

var s = 'Hello';

function greet(name){
    console.log(s + ',' + name + '!');
}
console.log(s);
var x = 10;

//第一种输出方式   建议这种方式输出变量
module.exports = {
    greet : greet,
    x : x
}


//第二种输出方式
/*exports.greet = greet;
exports.x = x;*/   

//不能直接给exports赋值  最后没有输出
/*exports = {
    greet : greet,
    x : x
}*/


