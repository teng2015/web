/**
 * @description angualr address
 * @author		wuhao
 * @createDate  2016-4-14
*/

angular.module('address',['ngRoute'])
	.controller('addressPage',function($scope){
		
		
	})
	.config(['$routeProvider',function($routeProvider){
		$routeProvider.when('/address',{
			templateUrl:'address.html',
			controller:'addressPage'
		});
			
	}]);