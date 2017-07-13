const path = require('path');
const mime = require('mime');
const fs = require('mz/fs');//mz提供的api和node.js的fs模块完全相同 但fs模块使用回调 而mz封装了fs对应的函数 并改为promise 这样我们就可以非常简单的用await调用mz函数 而不需要任何回调

//该文件用于处理静态文件 的middleware

//url 类似于‘/static/’
//dir 类似于_dirname + '/static/'


//staticFiles是一个普通函数，他能接收两个参数：url前缀和一个目录，然后返回一个async函数  这个async会判断当前的url是否以指定的前缀开头
//如果是  把url路径视为文件  并发送文件内容  如果不是这个async函数就不做任何事情  而是简单的调用await next()让下一个middleware去处理请求
function staticFiles(url,dir){
    return async (ctx,next) => {
        let rpath = ctx.request.path;
        //判断是否以指定的url开头
        if(rpath.startsWith(url)){
            //获取文件的完整路径
            let fp = path.join(dir,rpath.substr(url.length));
            //判断文件是否存在
            if(await fs.exists(fp)){
                //查找文件的mime
                ctx.response.type = mime.lookup(rpath);
                //读取文件内容并复制给response.body
                ctx.response.body = await fs.readFile(fp);
            }else{
                //文件不存在
                ctx.response.status = 404;
            }
        }else{
            //不是指定前缀的url  继续处理下一个middleware
            await next();
        }
    }
}

module.exports = staticFiles;