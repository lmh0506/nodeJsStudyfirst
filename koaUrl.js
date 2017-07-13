'use strict'
const Koa = require('koa');

//注意require('koa-router') 返回的是函数
const router = require('koa-router')();

const bodyParse = require('koa-bodyparser');

const app = new Koa();

//打印请求的url
app.use(async (ctx,next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}`);
    await next();
});

app.use(bodyParse());//必须在body之前被注册到app对象上
//添加url-router
router.get('/hello/:name',async (ctx,next) => {//使用router.get('/path',async fn) 来注册一个get请求，可以在请求路径中使用带变量的/hello/:name，变量可以通过ctx.params.name访问
    var name = ctx.params.name;
    ctx.response.body = `<h1>hello , ${name}</h1>`;

});

router.get('/',async (ctx,next) => {
    ctx.response.body = `<h1>index</h1>
        <form action = "/signin" method ="post">
            <p>Name :<input name="name" value="koa"/></p>
            <p>Password : <input name="password" type="password"/></p>
            <p><input type="submit" value = "Submit"/></p>
        </form>`;
});


router.post('/signin',async (ctx,next) => {
    var name = ctx.request.body.name || '',//拿到表单的那么字段，如果该字段不存在默认值为''
        password = ctx.request.body.password || '';
    console.log(`signin with name :${name}  ,  Password : ${password}`);
    if(name === 'koa' && password === '12345'){
        ctx.response.body = `<h1>welcome ,${name}</h1>`;
    }else{
        ctx.response.body = `<h1>login failed</h1>
        <p><a href="/">Try again</a</p>`;
    }
})
//add router middleware

app.use(router.routes());


app.listen(3000);
console.log('app started at port 3000');