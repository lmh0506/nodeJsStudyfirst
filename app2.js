const Sequelize = require('sequelize');
const config = require('./config');

//创建一个sequelize对象实例
var sequelize = new Sequelize(config.database,config.username,config.password,{
    host:config.host,
    dialect : 'mysql',
    pool:{
        max:5,
        min:0,
        idle:30000
    }
});

//定义模型pet 告诉sequelize如何映射数据库表

//我们把通过sequelize.define() 返回的pet称为model 它表示一个数据模型
var Pet = sequelize.define('pet',{
    id:{
        type:Sequelize.STRING(50),
        primaryKey : true
    },
    name:Sequelize.STRING(100),
    gender : Sequelize.BOOLEAN,
    birth : Sequelize.STRING(10),
    createdAt:Sequelize.BIGINT,
    updatedAt:Sequelize.BIGINT,
    version:Sequelize.BIGINT
},{
    timestamps:false
});//用sequelize.define() 定义model时  传入名称pet 默认的表名就是pets  第二个参数指定列名和参数类型如果是主键就详细指定，
//第三个参数是额外的配置 我们传入{timestamps:false}是为了关闭Sequelize的自动添加timestamp的功能 

var now = Date.now();
console.log(now);
Pet.create({
    id:'g-' + now,
    name:'Gaffey',
    gender:false,
    birth:'2007-07-07',
    createdAt:now,
    updatedAt:now,
    version:0
}).then(function(p){
    console.log('created ' + JSON.stringify(p));
}).catch(function(err){
    console.log('failed :' + err);
});

now = Date.now();
//用await写
(async () => {
    var dog = await Pet.create({
        id:'d-' + now,
        name:'Odie',
        gender:false,
        birth:'2008-08-08',
        createdAt:now,
        updatedAt:now,
        version:0
    });
    console.log('created :' + JSON.stringify(dog));

})();

//我们把通过pet.findAll()返回的一个或一组对象称为model实例  每个实例都可以直接通过JSON.stringify序列化成JSON字符串
//但他们和普通字符串相比 多了一些sequelize添加的方法 比如save() 和destroy 调用这些方法我们可以执行更新或者删除操作

//所以使用Sequelize操作数据库的一般步骤是 先通过某个model对象的findAll方法获取实例
//如果更新实例 先对实例属性赋值 在调用save()方法
//如果删除实例  直接调用destroy方法
//注意  findAll方法可以接收where order这些参数  这和将要生成的sql语句是对应的

//查询数据时  用await写
(async () => {
    var pets = await Pet.findAll({
        where:{
            name:'Gaffey'
        }
    });
    console.log(`find ${pets.length} pets`);
    for(let p of pets){
        console.log(JSON.stringify(p));
    }
})();

//如果要更新实例  可以对查询到的实例调用save()方法
(async () => {
    var pets = await queryFromSomewhere();
    for(let p of pets){
        p.gender = true;
        p.updatedAt = Date.now();
        p.version ++ ;
        await p.save();
    }
    
})();

//如果要删除数据  可以对查询到的实例调用destroy()方法
(async () => {
    var pets = await queryFromSomewhere();
    for(let p of pets){
            await p.destroy();
    }
})();
function queryFromSomewhere(){
    return  Pet.findAll({
        where:{
            name:'Odie'
        }
    });
}