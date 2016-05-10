/**
 * @description angualr Welcome
 * @author		wuhao
 * @createDate  2016-4-14
*/

angular.module('welcome',['ngRoute'])
	.controller('welcomePage',function($scope,$http){		
		ngCom.ngAjax({
			url:'/sec/loginhis/',
			method:'get',
			ngHttp:$http,
			success:function(data,status){
				$scope.loginAcc = data.currLoginNumber; //登录次数
				$scope.lastTime = data.lastLoginTime; //上次登录时间
			},
			
		});

		ngCom.ngAjax({
			url:"/sec/email/bind_status/",
			method:'get',
			ngHttp:$http,
			success:function(response){
				if(response.bindStatus=='null'){
					$('.bindTxt').show();
				}else{
				$('.bindTxt').hide();
				}
				
			},
			error:function (data){

			}
		});
		
	})
	.config(['$routeProvider',function($routeProvider){
		
		$routeProvider.when('/welcome',{
			templateUrl:'welcome.html',
			controller:'welcomePage'
		});
		
	}]);