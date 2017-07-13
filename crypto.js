'use strict'
//crypto模块的目的是为了提供通用的加密和哈希算法
const crypto = require('crypto');
const hash = crypto.createHash('md5');

//可任意多次调用update()
hash.update('Hello, world!');
hash.update('Hello, nodejs!');//update()方法默认字符串编码为utf-8 也可传入Buffer

console.log(hash.digest('hex'));//7e1977739c748beac0c0fd14fd26a544

const sha1 = crypto.createHash('sha1');//还可以使用更安全的  sha256  sha512   只要替换掉'sha1'即可
sha1.update('Hello, world!');
sha1.update('Hello, nodejs!');
console.log(sha1.digest('hex'));//1f32b9c9932c02227819a4151feed43e131aca40

//Hmac算法也是一种哈希算法  它可以利用MD5或SHA1等算法   不同的是他还需要一个秘钥
const hmac = crypto.createHash('sha256','secret-key');
//只要秘钥发生了变化，那么同样的输入数据也会得到不同的签名，因此，可以把hmac理解为随机数'增强'的哈希算法
hmac.update('Hello, world!');
hmac.update('Hello, nodejs!');

console.log(hmac.digest('hex'));

//AES是一种常见的对称算法，加解密都用同一个秘钥  crypto模块提供了AES支持，但是需要自己封装好函数，便于使用
function aesEncrypt(data,key){
    const cipher = crypto.createCipher('aes192',key);
    var crypted = cipher.update(data,'utf8','hex');
    crypted += cipher.final('hex');
    return crypted;
}

function aesDecrypt(encrypted,key){
    const decipher = crypto.createDecipher('aes192',key);
    var decrypted = decipher.update(encrypted,'hex','utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

var data = 'Hello, this is a secret message!';
var key = 'Password!';
var encrypted = aesEncrypt(data,key);
var decrypted = aesDecrypt(encrypted,key);

console.log('Plain text :' + data);
console.log('Encrypted text :' + encrypted);
console.log('Decrypted text : ' + decrypted);


//xiaoming's keys
var ming = crypto.createDiffieHellman(512);
var ming_key = ming.generateKeys();

var prime = ming.getPrime();
var generator = ming.getGenerator();

console.log('Prime :' + prime.toString('hex'));
console.log('Generator:' + generator.toString('hex'));

//xiaohong's keys
var hong = crypto.createDiffieHellman(prime,generator);
var hong_keys = hong.generateKeys();

//exchange and generate sercet
var ming_secret = ming.computeSecret(hong_keys);
var hong_secret = hong.computeSecret(ming_key);

//print secret
console.log('Secret of xiao ming :' + ming_secret.toString('hex'));
console.log('sercet of xiao hong :' + hong_secret.toString('hex'));//每次的输出都不同  因为素数的选择是唯一的