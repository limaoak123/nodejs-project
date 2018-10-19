var express = require('express');
var router = express.Router();
const usersModel = require('../model/usersModel.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 注册页面
// router.get('/register', function(req, res) {
//   res.render('register');
// });

// 注册处理
router.post('/register', function (req, res) {
  // console.log('获取传递过来的 post 请求的数据');
  // console.log(req.body);
  // 1. 用户名必须是 5 - 10为字符
  if (!/^\w{5,10}$/.test(req.body.username)) {
    res.render('werror', { code: -1, msg: '用户名必须是5-10位' });
    return;
  }

  // 其余的...

  // 操作数据库写入信息

  // err 需要是一个 对象 的格式 { code: 0, msg: 'xxx'}
  usersModel.add(req.body, function(err) {
    if (err) {
      // 如果有错误，直接将错误信息渲染到页面
      res.render('werror', err);
    } else {
      // 注册成功,跳转
      res.redirect('/login.html');
    }
  })

});

// 登录处理
router.post('/login', function(req, res) {
  // 调用 userModel里面的 login方法
  usersModel.login(req.body, function(err, data) {
    if (err) {
      res.render('werror', err);
    } else {
      // 跳到到首页
      console.log('当前登录用户的信息是', data);
      res.redirect('/');
    }
  })
})

module.exports = router;