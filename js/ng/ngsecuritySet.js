/**
 * @description angualr securitySet
 * @author		dtt
 * @createDate  2016-5-02
*/
	
angular.module('securitySet',['ngRoute'])
	.controller('securitySetPage',function($scope,$http){
		var eKey = localStorage.ekey;
		var eValue= localStorage.evalue;

		if(eKey && eValue){

			/*ngCom.ngAjax({
				url:"/sec/email/link/",
				data:json,
				method:'post',
				ngHttp:$http,
				success:function(response){},
				error:function (){}
			});*/

		}else if(eKey){
			
			/*ngCom.ngAjax({
				url:"/sec/email/link/",
				data:json,
				method:'post',
				ngHttp:$http,
				success:function(response){},
				error:function (){}
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
			
		}else{
			$('.showTxt').html("邮箱正确");
		}
	}); 

	/*$('.secEmailTxt').html($('#emailName').val());*/

	/*点击提交*/
	//$scope.aa = true;

	$('.sub').click(function (){
		//console.log(2);
		var json = {
			emailAddr:$('#emailName').val(),
			authCode: $('#yzmimg').val(),
			ssid:$('#ssid').attr("value")
		};
		
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
							
							$('.times').html(50);
							$('.button').attr('disabled',false);
							clearInterval(timer);
						}else{
							$('.times').html(count);
							$('.button').attr('disabled','disabled');
						}


					},1000);
					var emailInputVal=$('#emailName').val();

					$('.secEmailTxt').html(emailInputVal);
					

				}
				
			},
			error:function (error_data){
				console.log(error_data);
			}
		
		});

	});

	
	$('.button').click(function (){
		
		$('.secShow').hide();
		$('.bindEmail').show();
		loadImageCode();
		
		
	});
		
	})
	.config(['$routeProvider',function($routeProvider){
		$routeProvider.when('/securitySet',{
			templateUrl:'securitySet.html',
			controller:'securitySetPage'
		});
			
	}]);