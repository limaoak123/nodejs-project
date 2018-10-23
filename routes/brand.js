var express = require('express');
var router = express.Router();
const brandModel = require('../model/brandModel.js');
const multer = require('multer')
const upload = multer({
    dest:'c:/tmp/'
});
const fs = require('fs');
const path = require('path');

// 品牌新增
router.post('/add', upload.single('fileimg'), function(req, res) {

    console.log(req.file);
    console.log(req.body);
    fs.readFile(req.file.path, function(err, data) {
        if (err) {
            console.log('读文件失败', err);
        } else {
            var fileName = new Date().getTime() + '_' + req.file.originalname;
            var des_file = path.resolve(__dirname, '../public/brands/', fileName);
            console.log(des_file);
            fs.writeFile(des_file, data, function(err) {
                if (err) {
                console.log('写入失败', err);
                } else {
                console.log('写入成功');

                // 最终写入到数据库的时候，我们的图片信息就可以直接写一个路径进去，那么页面渲染的时候就用这个地址就行。
                // /public/mobiles/ + fileName
                // fileName
                }
            });

            console.log('-----'+fileName);
            console.log(req.body);
            brandModel.add({filename:fileName,brandname:req.body.brandname}, function(err) {
                if (err) {
                  // 如果有错误，直接将错误信息渲染到页面
                  res.render('werror', err);
                } else {
                  // 新增成功跳转
                  res.redirect('/brand-manager.html');
                }
            });
            
        }
    });
});

//品牌删除
router.get('/delete',function(req,res){
    var id = JSON.parse(req.query.id);
    brandModel.delBrand(id,function(err){
      
      if(err){
        res.render('werror',err);
      }
    }); 
    res.redirect('/brand-manager.html');
  });


  
module.exports = router;
