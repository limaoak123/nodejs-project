//模块  用户信息的后台数据库处理
//注册
//登录
//修改
//删除
//查询列表
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017';

MongoClient.connect(url,function(err,client){
    if(err) throw err;
    const db =client.db('limao');

    db.connect('users').insertOne()
})