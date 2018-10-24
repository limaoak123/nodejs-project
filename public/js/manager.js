$(".update").click(function(){
    $("#updateBox").fadeIn();
    $(".updateUser").val($(this).parents("tr").children(".userName").text().trim());
    $(".updateNick").val($(this).parents("tr").children(".nickName").text().trim());
    $(".updatePhone").val($(this).parents("tr").children(".phone").text().trim());
});
$(".cancle").click(function(){
    $("#updateBox").fadeOut();
});

$(".subUser").click(function(){
   // console.log($(".updateNick").val());
    
})




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