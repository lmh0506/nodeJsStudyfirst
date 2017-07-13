'use strict'
//导入websocket模块
const WebSocket = require('ws');
//引用Server类
const WebSocketServer = WebSocket.Server;
//实例化
const wss = new WebSocketServer({
    port:3000
});
//这样 我们就在3000端口上打开了一个webSocket Server 该实例由变量wss引用
//接下来 如果有webSocket请求接入 wss对象可以响应connection事件来处理这个webSocket
wss.on('connection',function(ws){
    //在connection事件中 回调函数会传入一个webSocket的实例 表示这个webSocket连接 对于每个webSocket连接 我们都要对它绑定某些事件方法来处理不同的事件
    console.log(`[SERVER] connection`);
    ws.on('message',function(message){
        //这里我们通过响应message事件 在收到消息后再返回一个echo：xxx的消息给客户端
        console.log(`[SERVER] Recevied:${message}`);
        ws.send(`ECHO:${message}`,(err) => {
            if(err){
                console.log(`[SERVER] error:${err}`);
            }
        });
    });
});

console.log('ws server started at port 3000...');

let count = 0;
let ws = new WebSocket('ws://localhost:3000/ws/chat');

ws.on('open',function(){
    console.log(`[CLIENT] open()`);
    ws.send('hello');
});

ws.on('message',function(message){
    console.log(`[CLIENT] Recevied: ${message}`);
    count++;
    if(count > 3){
        ws.send('goodbye');
        ws.close();
    }else{
        setTimeout(() => {
            ws.send(`hello,I'm Mr No.${count}`);
        },1000);
    }
})