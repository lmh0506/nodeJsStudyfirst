'use strict'
var fs = require('fs');

//打开一个流
var rs = fs.createReadStream('readme.txt','utf-8');
rs.on('data',function(chunk){//该事件可能会有多次  每次传递的chunk是流的一部分数据
    console.log('DATA');
    console.log(chunk);
});
rs.on('end',function(){
    console.log('END');
});
rs.on('error',function(err){
    console.log('ERROR:' + err);
});

var ws = fs.createWriteStream('text/streamOutput.txt','utf-8');
ws.write('使用Stream写入文本数据...\n');//记事本中打开可能没有换行
var text = `这
            是
            好
            多
            行`;
ws.write(text);
ws.write('END');
ws.end();

var ws2 = fs.createWriteStream('text/bufferOutput.txt','utf-8');
ws2.write(new Buffer('使用Stream写入二进制数据\n','utf-8'));
//ws2.write(new Buffer(text,'urf-8'));  
ws2.write(new Buffer('END','utf-8'));
ws.end();


//使用pipe()方法 复制一个文件
var copy = fs.createWriteStream('text/copied.txt');
rs.pipe(copy);
