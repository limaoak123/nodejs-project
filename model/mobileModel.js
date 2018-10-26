// 模块，是用来操作mobile相关的后台数据库处理的代码
// 新增手机操作
// 修改操作
// 删除操作

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017';
const async = require('async');
const mobileModel = {
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
        return;
      };
      const db = client.db('limao');

      let saveData = {
        mobilename: data.mobilename,
        filename: data.filename,
        brandname : data.brandname,
        authorprice : data.authorprice,
        shandprice : data.shandprice
      };

      //  async串行无关联

      async.series([
        function (callback) {
          // 查询是否已有该手机
          db.collection('mobile').find({mobilename: saveData.mobilename}).count(function(err, num) {
            if (err) {
              callback({ code: -101, msg: '查询是否已新增失败' });
            } else if (num !== 0) {
              console.log('已有该型号');
              callback({ code: -102, msg: '已有该型号'});
            } else {
              console.log('当前型号可以新增');
              callback(null);
            }
          })
        },

        function (callback) {
          // 查询表的所有记录条数
          db.collection('mobile').find().sort({_id:-1}).toArray(function(err, results) {
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
          db.collection('mobile').insertOne(saveData, function(err) {
            if (err) {
              callback({ code: -101, msg: '写入数据库失败'});
            } else {
              callback(null);
            }
          })
        }
      ], function(err, results){
        if (err) {
          console.log('上面的3步操作，可能出了问题', err);
          cb(err);
        } else {
          cb(null);
        }

        client.close();
      });
    })
  },
   
  /**
   * 获取手机列表
   * @param {object} data 页码信息与每页显示条数信息
   * @param {Function} cb 回调函数
   */
  getMobileInfo(data,cb){
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
              db.collection('mobile').find().count(function(err, num) {
                if (err) {
                  callback({code: -101, msg: '查询数据库失败'});
                } else {
                  callback(null, num);
                }
              })
            },
  
            function (callback) {
              // 查询分页的数据
              db.collection('mobile').find().limit(limitNum).skip(skipNum).toArray(function(err, data) {
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
                mobileInfo: results[1],
                page: data.page,
              })
            }
  
            // 关闭连接
            client.close();
          })
        }
      })
  },

  //删除手机
   delMobile(data,cb){
    MongoClient.connect(url, function(err, client) {
      if (err) {
        console.log("连接数据库失败")
        cb({code: -100, msg: '数据库连接失败'});
      } else {
        const db = client.db('limao');
        db.collection('mobile').deleteOne({_id:data});  
        cb(null);
      }
      client.close();
    });
  },

  //修改用户信息
  /**
   * 
   * @param {object} data 修改的手机信息 
   * @param {Function} cb 回调函数 
   */
  updateMobile(data,cb){
    MongoClient.connect(url, function(err, client) {
      let saveData = {
        mobilename: data.mobilename,
        authorprice : data.authorprice,
        shandprice : data.shandprice
      };
      if (err) {
        console.log("连接数据库失败")
        cb({code: -100, msg: '数据库连接失败'});
        return;
      } else {
        const db = client.db('limao');
        db.collection("mobile").updateOne({
          mobilename: saveData.mobilename,
        },{
          $set : {
            authorprice : saveData.authorprice,
            shandprice : saveData.shandprice
          }
        },function(err){
          if(err) throw err;
          console.log("修改成功")
          cb(null);
        });
        client.close();
      }
   });
  },

};


module.exports = mobileModel;