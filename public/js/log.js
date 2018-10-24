var usernameReg = /^\w{5,20}$/;
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

$("#sub").click(function(){
    if((usernameFlag&&pwdFlag)!= true){
        alert("请正确填写表单"); 
        event.preventDefault();
    }                  
});