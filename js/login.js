
	var app = angular.module('myApp', []);
	app.controller('formCtrl', function($scope,$http) {
    
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

    $scope.login=function (){
        
       login(); 
    }

    function loadImageCode(){
        var ssid = $("#ssid").val();
        
        $.post("/sec/captcha/",{id:ssid},function (repJson,status) { 
            $("#imageCode").html('<img src="data:image/png;base64,' + repJson + '" />');
        });

        /*ngCom.ngAjax({
            url:"/sec/captcha/?id="+ssid,
            data:{id:ssid},
            method:'post',
            ngHttp:$http,
            success:function(response){
                console.log(response);
                $("#imageCode").html('<img src="data:image/png;base64,' + response + '" />');
               
            },
            error:function (error_data){
                console.log(获取验证码失败);
            }
            
        });*/
    }
    


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

//login
function login(){

    var json = {
        userName:$('#loginname').attr("value"),
        passwd:$('#loginPassWord').attr("value"),
        "_@IMGRC@_":$('#yzmimg').attr("value"),
        ssid:$('#ssid').attr("value")

    }

    /*ngCom.ngAjax({
        url:"/sec/login",
        data:json,
        method:'get',
        ngHttp:$http,
        success:function(response){
            localStorage.token = response.token;
            window.location.href = "page/index.html";
           
        },
        errfn:function (error_data){
            console.log('获取验证码失败');
        }
        
    });*/
    

   $.ajax({
        url: "/sec/login",
        data:json,
        type: "get",
        contentType: "application/json; charset=UTF-8",
        async:false,
        statusCode: { 
            200: function (repJson) { 
             /*$.cookie('token', repJson.token);
               console.log($('#myForm').serialize());*/
                localStorage.token = repJson.token;
                window.location.href = "page/index.html";
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

});

