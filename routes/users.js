var express = require('express');
var router = express.Router();
const usersModel = require('../model/usersModel.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 注册处理
router.post('/register', function (req, res) {
  // 1. 用户名必须是 5 - 10为字符
  if (!/^\w{5,10}$/.test(req.body.username)) {
    res.render('werror', { code: -1, msg: '用户名必须是5-10位' });
    return;
}else if( !/^\S{6,20}$/.test(req.body.password)){
    res.render('werror', { code: -1, msg: '密码必须是6-20位' });
    return;
  }else if(!/^[0-9a-zA-Z\u4e00-\u9fa5_]{2,10}$/.test(req.body.nickname)){
    res.render('werror', { code: -1, msg: '昵称必须是2-10位' });
    return;
  }else if(!/^1[3-8]\d{9}$/.test(req.body.phone)){
    res.render('werror', { code: -1, msg: '正确填写11位手机号' });
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

      res.cookie('username',data.username,{
        maxAge: 1000 * 60 * 60 * 24,
      })

      res.cookie('nickname',data.nickname,{
        maxAge: 1000 * 60 * 60 * 24,
      })

      res.cookie('isAdmin',data.isAdmin,{
        maxAge: 1000 * 60 * 60 * 24,
      })

      res.redirect('/');
    }
  })
})

//退出登录
router.get('/logout',function(req,res){
  //清除cookie,跳转到登录

  res.clearCookie('username');
  res.clearCookie('nickname');
  res.clearCookie('isAdmin');
  
  res.send('<script>location.replace("/")</script>');
})

//用户删除
router.get('/delete',function(req,res){
  var id = JSON.parse(req.query.id);
  usersModel.delUser(id,function(err){
    
    if(err){
      res.render('werror',err);
    }
  }); 
  res.redirect('/user-manager.html');
});

//用户修改
router.post('/update',function(req,res){  
  usersModel.updateUser(req.body, function(err){
    if(err){    
      res.render('werror',err);
    }else{
      res.cookie('nickname',req.body.nickname,{
        maxAge: 1000 * 60 * 60 * 24,
      })
      res.redirect('/user-manager.html');
    }
  });
});

//用户搜索
router.get('/search',function(req,res){
 // console.log(req.query);
  let page = req.query.page || 1;
  let pageSize = req.query.pageSize || 5;
  var searchName = req.query.nickname;
  //console.log(searchName+'--------')
  if(searchName==''){
    res.redirect('/user-manager.html');
  }else{
    usersModel.searchUser({
      page: page,
      pageSize: pageSize,
      searchName: searchName
    },function(err,data){
      if(err){
        res.render('error',err);
      }else{
       // console.log('搜索结果'+data.userList);
        res.render('user-manager',{
          username:req.cookies.username,
          nickname:req.cookies.nickname,
          isAdmin: parseInt(req.cookies.isAdmin) ? '(管理员)' : '',
          page:data.page,
          userInfo: data.userList,
          totalPage:data.totalpage
        });
      }
    })
  }
});
module.exports = router;