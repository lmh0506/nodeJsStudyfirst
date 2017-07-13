const assert = require('assert');
const sum = require('./sum');


//单独写一个test.js的缺点是没法自动运行测试  而且如果第一个assert报错后面的测试也执行不了
//如果有很多测试需要运行 就必须把这些测试全部组织起来 然后统一执行 并且得到执行结果 
assert.strictEqual(sum(),0);
assert.strictEqual(sum(1),1);
assert.strictEqual(sum(1,2),3);
assert.strictEqual(sum(1,2,3),6);