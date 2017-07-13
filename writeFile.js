'use strict'
var fs = require('fs');

//异步写文件
var data = "hello,node.js";
fs.writeFile('output.txt',data,function(err){//参数依次为  文件名  数据  回调函数
//如果传入的数据是String默认按utf-8编码写入文件 如果传入的参数是Buffer 则写入的是二进制文件
    if(err){
        console.log(err);
    }
    else{
        console.log('ok');
    }
})

//同步写文件
fs.writeFileSync('text/output.txt',data);

//异步获取文件信息
fs.stat('readme.txt',function(err,stat){
    if(err){
        console.log(err);
    }
    else{
        //是否是文件
        console.log('isFile:' + stat.isFile());
        //是否是目录
        console.log('isDirectory:' + stat .isDirectory());

        if(stat.isFile()){
            //文件大小
            console.log('size:' + stat.size);
            //创建时间  date对象
            console.log('birth time:' + stat.birthtime);
            //修改时间  date对象
            console.log('modified time:' + stat.mtime);

        }

    }
});
//同步获取文件信息
var stat = fs.statSync('text/output.txt');
//是否是文件
        console.log('isFile:' + stat.isFile());
        //是否是目录
        console.log('isDirectory:' + stat .isDirectory());

        if(stat.isFile()){
            //文件大小
            console.log('size:' + stat.size);
            //创建时间  date对象
            console.log('birth time:' + stat.birthtime);
            //修改时间  date对象
            console.log('modified time:' + stat.mtime);

        }

