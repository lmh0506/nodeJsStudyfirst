'use strict'
/*module.exports = function(...rest){
    var sum = 0;
    for(let n of rest)
    {
        sum += n;
    }
    return sum;
}*/
const fs = require('mz/fs');

//一个简单的异步方法
module.exports = async () => {
    let expression = await fs.readFile('./text/data.txt','utf-8');
    let fn = new Function('return ' + expression);
    let r = fn();
    console.log(`calculate:${expression} = ${r}`);
    return r;
};