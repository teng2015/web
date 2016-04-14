/**
 * @description angualr aboutUs
 * @author		wuhao
 * @createDate  2016-4-14
*/

angular.module('aboutUs',['ngRoute'])
	.controller('aboutUsPage',function($scope){
		
		
	})
	.config(['$routeProvider',function($routeProvider){
		$routeProvider.when('/aboutUs',{
			templateUrl:'aboutUs.html',
			controller:'aboutUsPage'
		});
			
	}]);