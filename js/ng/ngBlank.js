angular.module('blank',['ngRoute'])
	.controller('blankController',function($scope,$http){
		function getUrlParam(name){
		
			var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
			var r = window.location.search.substr(1).match(reg);  //匹配目标参数
			if (r!=null) return unescape(r[2]); return null; //返回参数值
		} 
			var ekey=getUrlParam('eKey');
			var evalue=getUrlParam('eValue');

			
			var eToken = localStorage.token;
			
			var bindJson = {
				eKey:ekey,
				eValue:evalue

			};

			if(eToken!=undefined){

				if(ekey && evalue){
				
					ngCom.ngAjax({
						url:"/sec/email/site/",
						data:bindJson,
						method:'put',
						ngHttp:$http,
						success:function(response){
							if(response.result=='success'){
								ngCom.ngAjax({
									url:"/sec/email/bind_status/",
									method:'get',
									ngHttp:$http,
									success:function(response){
										var emailInputVal=response.emailAddr;
										var str = emailInputVal.substr(0,4);
										var at = emailInputVal.indexOf('@');
										var changestr = emailInputVal.substr(at);
										$('.bindEmail').html(str+'**'+changestr);
									},
									error:function (data){

									}
								});
								
								$('.bindSuccess').show();
								var times = 5;
								
								var timer = setInterval(function (){
									times--;
									if(times>=1){
										$('.count_time').html(times);
										
										
									}else if(times==0){
										window.location.href="/page/index.html#/securitySet";
									}
									
								},1000);

								
							}
							
						},
						error:function (data){
							console.log(data);
						},

						errfn:function(data){

							console.log(data.message);
							var mess = data.message;
							var messIndex = mess.indexOf('-');
							var p_sucessTxt = mess.substr(0,messIndex);
							var p_txt = mess.substr((messIndex+1));
							$('.p_sucess_tip').html(p_sucessTxt);
							$('.p_txt_tip').html(p_txt);
							$('.bindFail').show();
							
							
						}
					});

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
			}else{
				$('.bindFailTxt').show();
				
			}
			$('.jump').click(function (){
				window.location.href="/page/index.html#/securitySet";
			});
			$('.bindLogin').click(function (){
				delete localStorage.token;
				window.location.href="/index.html";
			});

			


	})
	.config(['$routeProvider','$httpProvider',function($routeProvider,$httpProvider){
		$httpProvider.defaults.headers.common['Authorization'] = localStorage.token; //注入 httpProvider 设置请求头token
		
	}]);