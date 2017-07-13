'use strict'
const fs = require('fs');
function addControllers(router,dir){
    //先自动扫描controllers目录  找到所有js文件  导入  然后注册每一个url
    //先导入fs模块 然后用readdirSync 列出文件
    //这里可以用sync是因为启动只运行一次，不存在性能问题
    var files = fs.readdirSync(__dirname + dir);

    //过滤出.js文件
    var js_files = files.filter((f) => {
        return f.endsWith('.js');
    });
    console.log(js_files);
    //处理每个js文件
    for(var f in js_files){
        console.log(`process controllers : ${js_files[f]}...`);
        //导入js文件
        let mapping = require(__dirname + dir + '\\' + js_files[f]);
        addMapping(router,mapping);
    }

}

function addMapping(router,mapping){
    for(var url in mapping){
        if(url.startsWith('GET')){
            //如果url类似于'GET XXX'
            var path = url.substr(4);//从'GET '之后截取
            router.get(path,mapping[url]);
            console.log(`regisiter url mapping: GET ${path}`);
        }else if(url.startsWith('POST')){
            //如果url类似于POST XXX
            var path = url.substr(5);
            router.post(path,mapping[url]);
            console.log(`register url mapping :post ${path}`);
        }else{
            //无效的url
            
            console.log(`invalid url : ${url}`);
        }
    }
}

module.exports = function(dir){
    let controllers_dir = dir || '\\controllers',
        router = require('koa-router')();

    addControllers(router,controllers_dir);
    return router.routes(); 
};
