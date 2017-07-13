'use strict'
const nunjucks = require('nunjucks');
function createEnv(path,opts){
    var autoescape = opts.autoescape && true,//给每个参数设置默认值
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(path,{//创建一个文件系统加载器  从page目录读取模板
                noCache : noCache,
                watch : watch,
            }),{
                autoescape : autoescape,
                throwOnUndefined : throwOnUndefined
            });
        if(opts.filters){
            for(var f in opts.filters){
                env.addFilter(f,opts.filters[f]);
            }
        }
        return env;
}

//变量env就表示Nunjucks模板对象，他有一个render(view,model) 方法  正好传入view和model参数，并返回字符串
var env = createEnv('page',{
    watch : true,
    filters:{
        hex : function(n){
            return '0x' + n.toString(16);
        }
    }
});

var s = env.render('hello.html',{name:'<script>alert("小明")</script>'});
console.log(s);

s = env.render('hello.html',{name:'小明',fruits:['苹果','橘子','香蕉']});
console.log(s);

console.log(env.render('hello.html',{
    header : 'Hello',
    body : 'bla bla bla...'
}));//footer 没有重定义  所以仍使用父模板的内容