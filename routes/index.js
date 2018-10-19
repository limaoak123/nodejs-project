var express = require('express');
var router = express.Router();

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

  res.render('index', { title: 'Express' });
});

// 注册页面
router.get('/register.html', function(req, res) {
  res.render('register');
});

// 登录页面
router.get('/login.html', function(req, res) {
  res.render('login');
})

module.exports = router;
