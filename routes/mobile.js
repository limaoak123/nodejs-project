var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017';
const mobileModel = require('../model/mobileModel.js');
const multer = require('multer')
const upload = multer({
    dest:'c:/tmp/'
});
const fs = require('fs');
const path = require('path');

// 手机新增
router.post('/add', upload.single('fileimg'), function(req, res) {

    console.log("--------");
    console.log(req.body);
    console.log("--------");
    fs.readFile(req.file.path, function(err, data) {
        if (err) {
            console.log('读文件失败', err);
        } else {
            var fileName = new Date().getTime() + '_' + req.file.originalname;
            var des_file = path.resolve(__dirname, '../public/mobiles/', fileName);
            console.log(des_file);
            fs.writeFile(des_file, data, function(err) {
                if (err) {
                console.log('写入失败', err);
                } else {
                console.log('写入成功');
                }
            });
            console.log(req.body);
            mobileModel.add({
                filename:fileName,
                mobilename:req.body.mobilename,
                brandname : req.body.brandname,
                authorprice : req.body.authorprice,
                shandprice : req.body.shandprice
            }, function(err) {
                if (err) {
                  // 如果有错误，直接将错误信息渲染到页面
                  res.render('werror', err);
                } else {
                  // 新增成功跳转
                  res.redirect('/mobile-manager.html');
                }
            });
            
        }
    });
});

//手机删除
router.get('/delete',function(req,res){
    var id = JSON.parse(req.query.id);
    mobileModel.delMobile(id,function(err){
      
      if(err){
        res.render('werror',err);
      }
    }); 
    res.redirect('/mobile-manager.html');
  });

//品牌option
router.post('/addbrand', function(req, res) {
    MongoClient.connect(url, function(err, client) {
        if (err) {
            console.log('连接数据库失败')
            res.send({code:-1,msg:'网络异常，请稍后重试'})
        } else {
            var db = client.db('limao')
            db.collection('brand').find().toArray(function(err,data){
             if (err) {
                 res.send({code:-2,msg:'数据库查询失败'})
             } else {
                 res.send({code:0,msg:'查询成功', data: data})
             }
         }) 
        }
    })
 });

 //价格修改
 router.post('/update',function(req,res){  
    mobileModel.updateMobile(req.body, function(err){
      if(err){    
        res.render('werror',err);
      }else{
        res.redirect('/mobile-manager.html');
      }
    });
  });
  
module.exports = router;
