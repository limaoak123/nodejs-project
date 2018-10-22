var usernameReg = /^\w{5,10}$/;
var usernameFlag = false;
$("#username").blur(function(){
	//开始检测用户名是否合法
	if(usernameReg.test(this.value)){
	    usernameFlag = true;
	    $(this).next("span").css("visibility","hidden")
    }else{
		$(this).next("span").css("visibility","visible")
	}
});

var pwdReg = /^\S{6,20}$/;
var pwdFlag = false;
$("#password").blur(function(){
    if(pwdReg.test(this.value)){
		pwdFlag = true;
	    $(this).next("span").css("visibility","hidden")
	}else{
		$(this).next("span").css("visibility","visible")		
	}
});

var repwdFlag = false;
$("#repassword").blur(function(){
    var pwd = $("#password").val();
    console.log(pwd);
    if(this.value == pwd){
         repwdFlag = true;
         $(this).next("span").css("visibility","hidden")
    }else{
        $(this).next("span").css("visibility","visible")
    }
});

var nickReg = /^[0-9a-zA-Z\u4e00-\u9fa5_]{2,10}$/;
var nickFlag = false;
$("#nickname").blur(function(){
    if(nickReg.test(this.value)){
		nickFlag = true;
	    $(this).next("span").css("visibility","hidden")
	}else{
		$(this).next("span").css("visibility","visible")		
	}

});

var phoneReg = /^1[3-8]\d{9}$/;
var phoneFlag = false;
$("#phone").blur(function(){
	if(phoneReg.test(this.value)){
			phoneFlag = true;
			$(this).next("span").css("visibility","hidden")
	}else{
			$(this).next("span").css("visibility","visible")		
    }
});


$("#sub").click(function(){
    if((usernameFlag&&pwdFlag&&repwdFlagg&&nickReg&&phoneReg)!= true){
        alert("请正确填写表单");
        
        event.preventDefault();
    }                  
});