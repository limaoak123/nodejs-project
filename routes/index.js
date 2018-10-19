var express = require('express');
var router = express.Router();

// 首页
router.get('/', function(req, res, next) {
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
