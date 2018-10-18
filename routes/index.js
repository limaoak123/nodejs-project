var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//注册页面
router.get('/register',function(req,res,next){
  res.render('register');
})
module.exports = router;
