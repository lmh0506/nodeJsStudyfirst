//这个middleware的作用是给ctx对象绑定一个render(view,model) 的方法 方便之后的controller调用渲染模板
const nunjucks = require('nunjucks');
function createEnv(path,opts){
    var autoescape = opts.autoescape === undefined ? true :opts.autoescape,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(path || 'page',{
                noCache:noCache,
                watch:watch
            }),{
                autoescape:autoescape,
                throwOnUndefined:throwOnUndefined
            });
        if(opts.filters){
            for(var f in opts.filters){
                env.addFilter(f,opts.filters[f]);
            }
        }
        return env;
}

function templating(path,opts){
    //创建nunjucks的env对象
    var env = new createEnv(path,opts);
    return async (ctx,next) => {
        //给ctx绑定render函数
        ctx.render = function(view,model){
            //把render之后的内容赋值给response.body
            ctx.response.body = env.render(view,Object.assign({},ctx.state || {},model || {}));
            //model || {}确保即使传入undefined  model也会变成默认值{}  Object.assign()会把除第一个参数以外的其他参数的所有属性复制到第一个参数中，第二个参数是ctx.state || {} 这个目的是为了能把一些公共的变量放入ctx.state并传给view

            //设置content-type
            ctx.response.type = 'text/html';
        }
        //继续处理请求
        await next();
    }
}

module.exports = templating;