/**
 * @description angualr securitySet
 * @author		dtt
 * @createDate  2016-5-02
*/
	
angular.module('securitySet',['ngRoute'])
	.controller('securitySetPage',function($scope,$http){
		ngCom.ngAjax({
			url:"/sec/email/bind_status/",
			method:'get',
			ngHttp:$http,
			success:function(response){
				if(response.bindStatus!=null){
					$('.bind').html('已绑定');
					$('.bind').unbind("click");
					$('.bind').css('color','#000');
					$('.em_state_status').attr('src','../images/yes.png');
					/*$('.layer').show();
					setTimeout(function (){
						$('.layer').hide();
					},3000);*/
				}
				
				
				
			},
			error:function (data){

			}
		});
		/*点击安全设置显示界面（隐藏绑定邮箱界面）*/
		$('.menu_child').click(function (){
			$('.security').show();
			$('.secShow').hide();
			$('.bindEmail').hide();
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
	    
	    $.post("/sec/secode/",{id:ssid},function (repJson,status) { 
	        $("#imageCode").html('<img src="data:image/png;base64,' + repJson + '" />');
	    });
	   
	}
	$('.bind').click(function (){
		$('.bindEmail').show();
		$('.security').hide();
	});
	$('.yzm_a').click(function (){

		loadImageCode();

	});
	/*邮箱失去焦点判断*/

	$('#emailName').focus(function (){
		$('.showTxt').html("请输入邮箱");
	});

	$('#emailName').blur(function (){
		var sText = $('#emailName').val();
		
		//var reMail =/^(?:[a-zA-Z0-9_]+[_\-\_\.]?)*[a-zA-Z0-9]+@(?:([a-zA-Z0-9]+[_\-]?)*[a-zA-Z0-9]+\.)+([a-zA-Z]{2,})+$/;
		//var reMail =/^\\s*\\w+(?:\\.{0,1}[\\w-]+)*@[a-zA-Z0-9]+(?:[-.][a-zA-Z0-9]+)*\\.[a-zA-Z]+\\s*$/;
		//var reMail =/^(\w+((-\w+)|(\.\w+))*)\+\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;

		var reMail =/^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/;

		if(!reMail.test(sText)){

			$('.showTxt').html("请正确填写邮箱");
			
		}else if(reMail.test(sText)==null){
			$('.showTxt').html("邮箱不能为空");
		}else{
			$('.showTxt').html("邮箱正确");
		}
	}); 

	/*$('.secEmailTxt').html($('#emailName').val());*/

	/*点击提交*/
	//$scope.aa = true;
	$('#yzmimg').focus(function(){
		$('.errMsg').hide();
	});

	$('.sub').click(function (){

		//console.log(2);
		$('.yzm_a').unbind('click');
		var json = {
			emailAddr:$('#emailName').val(),
			authCode: $('#yzmimg').val(),
			ssid:$('#ssid').attr("value")
		};
		if($('#emailName').val()){
  		ngCom.ngAjax({
			url:"/sec/email/link/",
			data:json,
			method:'post',
			ngHttp:$http,
			success:function(response){
				
				if(response.result=='success'){
					$('.bindEmail').hide();
					$('.secShow').show();
					//$scope.aa = !$scope.aa;
					var count=20;

					var timer=setInterval(function (){
						count--;
						
						if(count<=0){
							
							$('.times').html(20);
							$('.button').attr('disabled',false);
							$('.button').attr('color','#bfbfbf');
							clearInterval(timer);
						}else{
							$('.times').html(count);
							$('.button').attr('disabled','disabled');
						}


					},1000);
					var emailInputVal=$('#emailName').val();
					var str = emailInputVal.substr(0,3);
					var at = emailInputVal.indexOf('@');
					var changestr = emailInputVal.substr(at);
					/*console.log(str+'**');
					console.log(changestr);
					console.log(str+'**'+changestr);*/
					

					$('.secEmailTxt').html(str+'***'+changestr);
					

				}
				
			},
			error:function(data){

				/*console.log(data);
				console.log(data.message);
				$('.errMsg').empty().html(data.message).show();
				loadImageCode();*/
			},
			errfn:function(data){
				
				
				$('.errMsg').empty().html(data.message).show();
				$('.yzm_a').click(function (){

					loadImageCode();

				});
				loadImageCode();
			}
		
		});
	}else{
		$('.showTxt').html("邮箱不能为空");	
	}

	});

	
	$('.button').click(function (){
		loadImageCode();
		$('.yzm_a').click(function (){

			loadImageCode();

		});
		
		$('.secShow').hide();
		$('.bindEmail').show();
		$('#emailName').val('');
		$('#yzmimg').val('');
		$('.showTxt').html('');
		
		
		
	});
		
	})
	.config(['$routeProvider',function($routeProvider){
		$routeProvider.when('/securitySet',{
			templateUrl:'securitySet.html',
			controller:'securitySetPage'
		});
			
	}]);