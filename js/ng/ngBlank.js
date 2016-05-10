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

								
								$('.bindSuccess').show();

								
								setTimeout(function (){
									window.location.href="http://101.201.46.3:8080/page/index.html#/securitySet";
								},5000);
							}
							
						},
						error:function (data){
							console.log(data);
						},

						errfn:function(data){
							
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
				
				window.location.href="/index.html";
			}
			$('.jump').click(function (){
				window.location.href="http://101.201.46.3:8080/page/index.html#/securitySet";
			});
			$('.bindLogin').click(function (){
				window.location.href="/index.html";
			});

			ngCom.ngAjax({
				url:"/sec/email/bind_status/",
				method:'get',
				ngHttp:$http,
				success:function(response){
					
					$('.bindEmail').html(response.emailAddr);
				},
				error:function (data){

				}
			});


	})
	.config(['$routeProvider','$httpProvider',function($routeProvider,$httpProvider){
		$httpProvider.defaults.headers.common['Authorization'] = localStorage.token; //注入 httpProvider 设置请求头token
		
	}]);