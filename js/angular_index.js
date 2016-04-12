
	var app = angular.module('myApp', []);
	app.controller('formCtrl', function($scope) {
    
	/*username*/	
    $scope.userfocus=function (){
    	
    	$(".notice1Name").show();
    	$(".notice2Name").hide();
    	$(".notice3Name").hide();
    	$(".notice4Name").hide();

    }

    $scope.userblur=function (){
    	
    	var User=$scope.user;
    	
    	if(User==null){
    		$(".notice1Name").hide();
    		$(".notice2Name").show();
    		$(".notice3Name").hide();
    		$(".notice4Name").hide();

    	}else if(User.length<5){
    		$(".notice1Name").hide();
    		$(".notice2Name").hide();
    		$(".notice3Name").show();
    		$(".notice4Name").hide();
    	}else{
    		$(".notice1Name").hide();
    		$(".notice2Name").hide();
    		$(".notice3Name").hide();
    		$(".notice4Name").show();
    	}

    }

    /*password*/
    $scope.passfocus=function (){
    	
    	$(".notice1Pass").show();
    	$(".notice2Pass").hide();
    	$(".notice3Pass").hide();
    	$(".notice4Pass").hide();

    }

    $scope.passblur=function (){
    	
    	var Pass=$scope.passw;
    	
    	if(Pass==null){
    		$(".notice1Pass").hide();
    		$(".notice2Pass").show();
    		$(".notice3Pass").hide();
    		$(".notice4Pass").hide();

    	}else if(Pass.length<6){
    		$(".notice1Pass").hide();
    		$(".notice2Pass").hide();
    		$(".notice3Pass").show();
    		$(".notice4Pass").hide();
    	}else{
    		$(".notice1Pass").hide();
    		$(".notice2Pass").hide();
    		$(".notice3Pass").hide();
    		$(".notice4Pass").show();
    	}

    }

    $scope.loadImageCode=function (){

       loadImageCode(); 
    }

    /*$scope.checkImageCode=function (){
        
       checkImageCode(); 
    }*/

    $scope.login=function (){
        
       login(); 
    }
    
});

function guid() {
    function S4() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
    return (S4()+S4()+S4()+S4()+S4()+S4()+S4()+S4());
}

function init(){
    $("#ssid").val(guid());
    loadImageCode();
}

init();

function loadImageCode(){
    var ssid = $("#ssid").val();
    /*var captchaURL = '/sec/captcha/';
    var captchaData={id:ssid};
    $http.post(captchaURL,captchaData).success(function (repJson,status){
        $("#imageCode").html('<img src="data:image/png;base64,' + repJson + '" />');
    });*/
    
    $.post("/sec/captcha/",{id:ssid},function (repJson,status) { 
        $("#imageCode").html('<img src="data:image/png;base64,' + repJson + '" />');
    });
}

//页面元素 图形验证码检验 
function checkImageCode(){

    var ssid = $("#ssid").val();
    if (document.getElementById('yzmimg').value == '') {
        $("#imageCodeInfo").text("验证码不能为空或空格");
        $("#imageCodeInfo").removeClass("yes").addClass("no");
        return false;
    }
    $("#imageCodeInfo").text("");
    $("#imageCodeInfo").removeClass("no").addClass("yes");
    var code = document.getElementById('yzmimg').value;
    
    $.ajax({
        url: '/sec/captcha/'+ssid+'?code='+code,
        type: 'DELETE',
        data: {id:ssid,code:code},
        statusCode: { 
            200: function (repJson) { 
                $("#imageCodeInfo").text("");
                $("#imageCodeInfo").removeClass("no").addClass("yes");
                return true;
            }
        },
        error: function (xhr, statusText, err) {
            document.getElementById('yzmimg').value ='';
            $("#imageCodeInfo").text("验证码错误，请重新输入");
            $("#imageCodeInfo").removeClass("yes").addClass("no");
            init();

            return false;
        }
    });

}

//login
function login(){
    $.ajax({
        url: "/sec/login",
        data:$('#myForm').serialize(),
        type: "GET",
        contentType: "application/json; charset=UTF-8",
        async:false,
        statusCode: { 
            200: function (repJson) { 
               /* $.cookie('token', repJson.token); */
                localStorage.token = repJson.token;
                window.location.href = "welcome.html";
            },
            201: function (res, stausText, xhr) {
              alert("系统错误201，请稍后重试!");
          },
          401: function (repJson) {
              alert("认证失败!");
          },
          403: function (repJson) {
              alert("没有权限,或未登录!");
          },
          404: function () {
              alert("系统错误404，请稍后重试!");
          },
          500: function (xhr, statusText, err) {
              alert("系统错误500，请稍后重试!");
          }
      },
      error: function (xhr, statusText, err) {
              alert("系统错误，请稍后重试!");
      }
  });
}



