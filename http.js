'use strict'
//寻入http模块
var http = require('http');

//创建http server 并传入回调函数
var server = http.createServer(function(request,response){
    //回调函数接收request和response对象
    //获得http请求的method和url
    console.log(request.method + ':' + request.url);

    //将http响应写入response中  同时设置Content-Type：text/html
    response.writeHead(200,{'Content-Type':'text/html'});
    //将http响应的html内容写入response
    response.end('<h1>hello world</h1>');

});

//让服务器监听8080端口
server.listen(8080);
console.log('server is running at http://localhost:8080')