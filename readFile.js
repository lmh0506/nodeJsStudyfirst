'use strict'
var fs = require('fs');

//异步读取文件
fs.readFile('readme.txt','utf-8',function(err,data){//读取的文件必须在当前目录下，且文件编码utf-8
    if(err){//当读取失败时，err参数代表一个错误对象，data为undefined
        console.log(err);
    }
    else{//当读取成功时，err参数为null，data参数为读取到的string
        console.log(data);
    }
});

fs.readFile('1.jpg',function(err,data){
    if(err){
        console.log(err);
    }
    else{//读取图片成功时   或其他二进制文件成功时  data返回的是一个Buffer对象就是一个包括零个或任意字节的数组（注意和Array不同）
        console.log(data);
        console.log(data.length + 'bytes');
        var text = data.toString('utf-8');//把一个buffer对象转换成String
        console.log(text);

        var buf = new Buffer(text,'utf-8');//把一个String对象转换成buffer
        console.log(buf);
    }
});


//同步读取文件
var data = fs.readFileSync('readme.txt','utf-8');//同步读取直接返回结果  不返回错误
console.log(data);
try{//同步读取文件错误用try。。catch捕获
    var data = fs.readFileSync('text/output.txt','utf-8');
    console.log(data);
}catch(err){
    console.log(err);
}
