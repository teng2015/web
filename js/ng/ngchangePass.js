/**
 * @description angualr changePass
 * @author		wuhao
 * @createDate  2016-4-14
*/
	
angular.module('changePass',['ngRoute'])
	.controller('changePassPage',function($scope){
		
		
	})
	.config(['$routeProvider',function($routeProvider){
		$routeProvider.when('/changePass',{
			templateUrl:'changePass.html',
			controller:'changePassPage'
		});
			
	}]);