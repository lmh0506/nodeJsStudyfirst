'use strict'
//导入koa  和koa.1.x 不同 在koa2中，我们导入的是一个class，因此用大写的koa表示
const Koa = require('koa');

//创建一个Koa对象表示web APP本身
const app = new Koa();

app.use(async (ctx,next) => {
    console.log(`${ctx.request.method} ${ctx.request.url}`)//打印url
    await next();//调用下一个middleware
});

app.use(async (ctx,next) => {
    const start = new Date().getTime();//当前时间
    await next();//调用下一个middleware
    const ms = new Date().getTime() - start;//耗费时间
    console.log(`Time:${ms}ms`);//打印耗费时间
});

//对于任何请求，app将调用该异步函数处理请求
app.use(async (ctx,next)=>{//对于每个http请求  koa将调用我们传入的异步函数来处理
    //参数ctx是由koa传入的封装了request和response的变量，我们可以通过它访问request和response
    //next是koa传入的将要处理的下一个异步函数

    //在上面的异步函数中，我们首先用await.next();处理下一个异步函数，然后设置response的content-type和内容


    //由async标记的函数称为异步函数，在异步函数中，可以用await调用另一个异步函数
    await next();//调用下一个middleware

    //设置response的Content-Type
    ctx.response.type = 'text/html';

    //设置response的内容
    ctx.response.body = '<h1>hello,koa2!</h1>';
});

//mideleware的顺序很重要，也就是调用app.use()的顺序决定了middleware的顺序


//如果一个middleware没有调用await.next()  后续的middleware将不在执行
//例如一个检测用户权限的middleware可以决定是否继续处理请求，还是直接返回403错误
/*app.use(async (ctx,next) => {
    if(await checkUserPermission(ctx)){//判断是否有权限
        await next();
    }else{
        ctx.response.status = 403;
    }
});*/


//ctx对象的一些简写方法  例如ctx.url 相当于ctx.request.url  ctx.type 相当于ctx.response.type

//在端口3000监听
app.listen(3000);
console.log('app started at port 3000...');
