var express = require('express');
var router = express.Router();
var usersModel = require('../model/usersModel');
// 首页
router.get('/', function(req, res, next) {
  //判断cookie用户信息
  if(req.cookies.username){
    res.render('index',{
      username: req.cookies.username,
      nickname: req.cookies.nickname,
      isAdmin: parseInt(req.cookies.isAdmin) ? '(管理员)' : ''
    });
  }else{
    //跳转到登录页面
    res.redirect('/login.html');
  }
});

// 注册页面
router.get('/register.html', function(req, res) {
  res.render('register');
});

// 登录页面
router.get('/login.html', function(req, res) {
  res.render('login');
})

//用户管理页面
router.get('/user-manager.html',function(req,res){
    //判断用户是否登录及是否为管理员
    if(req.cookies.username && parseInt(req.cookies.isAdmin)){
      // 需要查询数据库
      // 从前端取得2个参数
      let page = req.query.page || 1; // 页码
      let pageSize = req.query.pageSize || 5; // 每页显示的条数

      usersModel.getUserInfo({
        page: page,
        pageSize : pageSize
      },function(err,data){
        if (err) {
          res.render('werror', err);
        } else {
          res.render('user-manager',{
            username: req.cookies.username,
            nickname: req.cookies.nickname,
            isAdmin: parseInt(req.cookies.isAdmin) ? '(管理员)' : '',

            userInfo : data.userInfo,
            totalPage: data.totalPage,
            page: data.page
          });
        }
      });

     
    }else{
      res.redirect('/login.html');
    }
})

//手机管理页面
router.get('/mobile-manager.html',function(req,res){
  //判断用户是否登录
  if(req.cookies.username){
    res.render('mobile-manager',{
      username: req.cookies.username,
      nickname: req.cookies.nickname,
      isAdmin: parseInt(req.cookies.isAdmin) ? '(管理员)' : ''

      
    });
  }else{
    res.redirect('/login.html');
  }
})

module.exports = router;