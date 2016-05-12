/**
 * @description angualr Index
 * @author		wuhao
 * @createDate  2016-4-14
*/

angular.module('app',[
    'ngRoute',
    'welcome',
	'riskSearch',
	'riskHistory',
	'userInfo',
	'changePass',
	'aboutUs',
	'address',
	'securitySet'
])
	.config(['$routeProvider','$httpProvider',function($routeProvider,$httpProvider){
		if(localStorage.token){
			$httpProvider.defaults.headers.common['Authorization'] = localStorage.token; //注入 httpProvider 设置请求头token
		}else{
			window.location.href="/index.html";
		}
		//$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
		$routeProvider.otherwise({
			redirectTo:'/welcome' //重定向指向welcome.html
		});
	}]);
