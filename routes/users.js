var express = require('express');
var router = express.Router();
const usersModel = require('../model/usersModel');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//注册的处理
router.post('/register',function(req,res){
  console.log(req.body);
  //1.用户名必须是5-10位字符
  if(!/\w{5.10}/.test(req.body.username)){
    res.render('werror',{code:-1,msg: '用户名必须是5-10位字符'});
  }
  
  usersModel.add(req.body,function(err){
      if(err) throw err;

      res.render('login');
  })

 
})
module.exports = router;
