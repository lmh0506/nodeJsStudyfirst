'use strict'
var url = require('url');
console.log(url.parse('http://user:pass@host.com:8080/path/to/file?query=string#hash'));

var path = require('path');
//解析当前目录
var workDir = path.resolve('.');//e:\myWeb\nodeJsStudy
console.log(workDir);
//组合完整的文件路径：当前目录+'pub' + 'index.html'
var filePath = path.join(workDir,'pub','index.html');//e:\myWeb\nodeJsStudy\pub\index.html
console.log(filePath);

var fs = require('fs'),
    URL = require('url'),
    PATH = require('path'),
    http = require('http');

//从命令行参数获取root目录，默认是当前目录
var root = PATH.resolve(process.argv[2] || '.');
console.log('Static root dir :' + root);
//创建服务器
var server = http.createServer(function(request,response){
    //获得url的path  类似'/css/bootstrap.css'
    var pathname = URL.parse(request.url).pathname;//类似于   /page/index.html
    console.log(pathname);
    //获得对应的本地文件路径，类似于'/srv/www/css/bootstrap.css'
    var filepath = PATH.join(root,pathname);//类似于   e:\myWeb\nodeJsStudy\page\index.html
    console.log(filepath);
    //获取文件状态
    fs.stat(filepath,function(err,stats){
        if(!err && stats.isFile()){
            //没有出错并且文件存在
            console.log('200' + request.url);
            //发送200响应
            response.writeHead(200);
            //将文件流导向response
            fs.createReadStream(filepath).pipe(response);
        }
        else if(!err && stats.isDirectory()){//如果是文件目录
            var files = ['default.html','index.html'];//查找的默认文件数组
            for(var i = 0 ; i < files.length ; i++)
            {
                var defaultPath = PATH.join(filepath,files[i]);//生成新的文件路径
                console.log(defaultPath);
                if(fs.existsSync(defaultPath)){
                    //判断文件是否存在
                    response.writeHead(200);
                    fs.createReadStream(defaultPath).pipe(response);
                    return;
                }
                
            }
            //出错了或者文件不存在
            console.log('404' + request.url);
            //发送404响应
            response.writeHead(404);
            response.end('404 not found');
        }
        else
        {
            //出错了或者文件不存在
            console.log('404' + request.url);
            //发送404响应
            response.writeHead(404);
            response.end('404 not found');

        }
    });
});

server.listen(8080);
console.log('Server is running at localhost:8080');