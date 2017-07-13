'use strict'
/*const assert = require('assert');

const sum = require('../hellosum');

describe('#hellosum.js',() => {
    describe('#sum()',() => {
        it('sum() should return 0', () => {
        assert.strictEqual(sum(),0);
        });
        it('sum(1) should return 1',() => {
            assert.strictEqual(sum(1),1);
        });
        it('sum(1,2) should return 3',() => {
            assert.strictEqual(sum(1,2),3);
        });
        it('sum(1,2,3) should return 6',() => {
            assert.strictEqual(sum(1,2,3),6);
        });
    });
    
});*/
//这里我们使用mocha默认的bdd-style的测试。describe可以任意嵌套 以便把相关测试看成一组测试
//每个it('name',function(){...})就代表一个测试

const assert = require('assert');
const hello = require('../hellosum');

describe('#async hello',() => {
    describe('#asyncCalculate()',() =>{
        it('#async with done',(done) => {
            (async function(){
                try{
                    let r = await hellosum();
                    assert.strictEqual(r,15);
                    done();
                }catch(err){
                    done(err);
                }
            })();
        });

        it('#async function',async () => {
            let r = await hellosum();
            assert.strictEqual(r,15);
        });

        it('#async function',() => {
            assert(true);
        });
    });
});