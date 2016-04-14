/**
 * @description angualr userInfo
 * @author		wuhao
 * @createDate  2016-4-14
*/


angular.module('userInfo',['ngRoute'])
	.controller('userInfoPage',function($scope){
		
		
	})
	.config(['$routeProvider',function($routeProvider){
		$routeProvider.when('/userInfo',{
			templateUrl:'userInfo.html',
			controller:'userInfoPage'
		});
			
	}]);