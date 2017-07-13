
const Koa = require('koa');
const bodyParse = require('koa-bodyparser');
//导入controller middleware
const controller = require('./controllers');
const templating = require('./templating');
//使用middleware
const app = new Koa();
const isProduction = process.env.NODE_ENV === 'production';//该变量用来判断是否是production环境  如果是就使用缓存  如果不是就关闭缓存
//关闭缓存后  我们修改view 可以直接刷新浏览器看到效果  否则每次修改都必须node程序  会极大的降低开发效率

//注意：生产环境上必须配置环境变量NODE_ENV = 'production'，而开发环境不需要配置，实际上NODE_ENV可能是undefined，所以判断的时候，不要用NODE_ENV === 'development'。

//第一个middleware是记录url以及url以及页面执行时间
app.use(async (ctx,next) => {
    console.log(`process ${ctx.request.method} ${ctx.request.url}...`);
    var start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time',`${execTime}ms`);
})

//第二个middleware处理静态文件
if(!isProduction){
   let staticFiles = require('./static-files');
   app.use(staticFiles("/static/",__dirname+'/static'));
}

//第三个解析post请求
app.use(bodyParse());//必须在body之前被注册到app对象上

//第四个middleware负责给ctx加上render() 来使用nunjucks
app.use(templating('page',{
    noCache : !isProduction,
    watch : !isProduction
}));

//最后一个处理路由
app.use(controller());

app.listen(3000);
console.log(`running in 3000`);