
//用户信息修改
$(".update").click(function(){
    $("#updateBox").fadeIn();
    var nickname = $(this).parents("tr").children(".nickName").text().trim(); //当前要修改的用户昵称
    $(".updateUser").val($(this).parents("tr").children(".userName").text().trim());
    $(".updateNick").val(nickname);
    $(".updatePhone").val($(this).parents("tr").children(".phone").text().trim());

    var loginName = $(".header_right span").text().trim();//当前登录的用户昵称
    if(nickname == loginName){
        $(".subUser").click(function(){
            var cName = $(".updateNick").val();
            $.cookie("nickname",cName);
        })
    }

});
$(".cancle").click(function(){
    $("#updateBox").fadeOut();
});


//用户搜索验证
var searchFlag = false;
var seaReg = /^[0-9a-zA-Z\u4e00-\u9fa5_]{1,10}$/;
$(".seaName").blur(function(){
    if(seaReg.test(this.value)){
		searchFlag = true;
	}
});
$(".seaSub").click(function(){
    if((searchFlag)!= true){
        alert("请填写昵称");  
        event.preventDefault();
    }                  
});

//添加品牌
$(".addBrandBtn").click(function(){
    $(".addBrand").fadeIn();
})
$(".cancleBrand").click(function(){
    $(".addBrand").fadeOut();
});

$.post('/mobile/addbrand',function(result) {
    var html = ''
    for(var i = 0 ; i < result.data.length;i++){
        html += `<option>${result.data[i].brandname}</option>`
    }
    $('.selBrand').append(html);
})

//添加手机
$(".updateMobileBtn").click(function(){
    $("#updateMobileBox").fadeIn();
    $(".updateMobile").val($(this).parents("tr").children(".mName").text().trim());
    $(".updateBrand").val($(this).parents("tr").children(".bName").text().trim());
    $(".updateAprice").val($(this).parents("tr").children(".aPrice").text().trim());
    $(".updateSprice").val($(this).parents("tr").children(".sPrice").text().trim());
});
$(".cancleMoblie").click(function(){
    $("#updateMobileBox").fadeOut();
});

$(".addMobileBtn").click(function(){
    $(".addMobile").fadeIn();
})
$(".cancle1").click(function(){
    $(".addMobile").fadeOut();
});

/*$(function () {
    var str = location.href;
    var page = str.split("=")[1]
    var urlstr = str.split("=")[0].split("3000/")[1].split("?")[0];
    var tol = $('.pageNum li').length - 2;
    // console.log(p)
    $("#prev").click(function () {
        if (!page) {
            page = 1
        }
        page--
        if (page === 0) {
            page = 1
        }
        $(this).attr("href", `${urlstr}?page=${page}`)
    })
    $('#next').click(function () {
        if (!page) {
            page = 1
        }
        page++;
        if (page > tol) {
            page = tol
        }
        $(this).attr("href", `${urlstr}?page=${page}`)
    })
})*/

//分页
$(function () {
    var str = location.href;
    const searchname = str.split('3000/')[1].split('&')[0].split('/')[1];
    var urlt = str.split("=")[0].split('0/')[1].split('?')[0];
    var tol = $('.pageNum li').length - 2;
    if (urlt === 'users/search') {
      var page = str.split("&")[1];
      if (page) {
        page = page.split('=')[1];
        $("#prev").click(function () {
          if (!page) {
            page = 1
          }
          page--
          if (page === 0) {
            page = 1
          }
          $(this).attr("href", `${searchname}&page=${page}`)
        })
        $('#next').click(function () {
          if (!page) {
            page = 1
          }
          page++;
          if (page > tol) {
            page = tol
          }
          $(this).attr("href", `${searchname}&page=${page}`)
        })
      }else{
        $('#prev').click(function () {
          $(this).attr("href", `${searchname}&page=1`);
          });
          $('#next').click(function () {
            $(this).attr("href", `${searchname}&page=2`);
            })
      }

    } else {
      var page = str.split("=")[1];
      $("#prev").click(function () {
        if (!page) {
          page = 1
        }
        page--
        if (page === 0) {
          page = 1
        }
        $(this).attr("href", `${urlt}?page=${page}`)
      })
      $('#next').click(function () {
        if (!page) {
          page = 1
        }
        page++;
        if (page > tol) {
          page = tol
        }
        $(this).attr("href", `${urlt}?page=${page}`)
      })
    }

  })

//高亮
  $(function(){
      var ustr = location.href.split("0/")[1].split("-")[0];
        console.log(ustr);
      if(ustr == "user"){
          $(".item1").css("background","#67E8CB")
      }else if(ustr == "mobile"){
          $(".item2").css("background","#67E8CB")
      }else if(ustr == "brand"){
        $(".item3").css("background","#67E8CB")
      }else if(ustr.split("/")[0]== "users"){
        $(".item1").css("background","#67E8CB")
      }
      
  })

