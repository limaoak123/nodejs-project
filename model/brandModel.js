// 模块，是用来操作brand相关的后台数据库处理的代码
// 新增品牌操作
// 修改操作
// 删除操作

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017';
const async = require('async');
const brandModel = {
    /**
   * 新增操作
   * @param {Object} data 新增信息
   * @param {Function} cb 回调函数
   */
  add (data, cb) {
    MongoClient.connect(url, function(err, client) {
      if (err) {
        console.log('链接数据库失败', err);
        cb({ code: -100, msg: '链接数据库失败'});

        // 这里不需要关闭连接，因为没有连接成功。
        return;
      };
      const db = client.db('limao');

      let saveData = {
        brandname: data.brandname,
        filename: data.filename
      };

      //  async串行无关联

      async.series([
        function (callback) {
          // 查询是否已有该品牌
          db.collection('brand').find({brandname: saveData.brandname}).count(function(err, num) {
            if (err) {
              callback({ code: -101, msg: '查询是否已新增失败' });
            } else if (num !== 0) {
              console.log('已有该品牌');
              callback({ code: -102, msg: '已有该品牌'});
            } else {
              console.log('当前品牌可以新增');
              callback(null);
            }
          })
        },

        function (callback) {
          // 查询表的所有记录条数
          db.collection('brand').find().sort({_id:-1}).toArray(function(err, results) {
            if (err) {
              callback({ code: -101, msg: '查询表的所有记录条数失败'});
            } else {
              if(results==""){
                saveData._id = 1;
              }else{
                var num = results[0]._id
                saveData._id = num+1
              }
             
              callback(null);
            }
          })
        },

        function (callback) {
          // 写入数据库
          db.collection('brand').insertOne(saveData, function(err) {
            if (err) {
              callback({ code: -101, msg: '写入数据库失败'});
            } else {
              callback(null);
            }
          })
        }
      ], function(err, results){
        // 不管上面3个异步操作是否都成功，都会进入到这个最终的回调里面
        if (err) {
          console.log('上面的3步操作，可能出了问题', err);
          // 还得告诉前端页面
          cb(err);
        } else {
          cb(null);
        }

        client.close();
      });
    })
  },
   
  /**
   * 获取品牌列表
   * @param {object} data 页码信息与每页显示条数信息
   * @param {Function} cb 回调函数
   */
  getbrandInfo(data,cb){
    MongoClient.connect(url, function(err, client) {
        if (err) {
          cb({code: -100, msg: '链接数据库失败'});
        } else {
          var db = client.db('limao');
  
          var limitNum = parseInt(data.pageSize);
          var skipNum = data.page * data.pageSize - data.pageSize;
  
          async.parallel([
            function (callback) {
              // 查询所有记录
              db.collection('brand').find().count(function(err, num) {
                if (err) {
                  callback({code: -101, msg: '查询数据库失败'});
                } else {
                  callback(null, num);
                }
              })
            },
  
            function (callback) {
              // 查询分页的数据
              db.collection('brand').find().limit(limitNum).skip(skipNum).toArray(function(err, data) {
                if (err) {
                  callback({code: -101, msg: '查询数据库失败'});
                } else {
                  callback(null, data);
                }
              })
            }
          ], function(err, results) {
            if (err) {
              cb(err);
            } else {
              cb(null, {
                totalPage: Math.ceil(results[0] / data.pageSize),
                brandInfo: results[1],
                page: data.page,
              })
            }
  
            // 关闭连接
            client.close();
          })
        }
      })
  },

  //删除品牌
   delBrand(data,cb){
    MongoClient.connect(url, function(err, client) {
      if (err) {
        console.log("连接数据库失败")
        cb({code: -100, msg: '数据库连接失败'});
      } else {
        const db = client.db('limao');
        db.collection('brand').deleteOne({_id:data});  
        cb(null);
      }
      client.close();
    });
  },

};


module.exports = brandModel;