/**
 * @description angualr riskSearch
 * @author		wuhao
 * @createDate  2016-4-14
*/

angular.module('riskSearch',['ngRoute'])
	.controller('riskSearchPage',function($scope,$http){

		$scope.riskSearch=function (){
			ngCom.ngAjax({
			url:"/cif/cifs/?nm="+encodeURI($.trim($scope.nm))+"&idNo="+$.trim($scope.idNo)+"&mtTenantId=1",
			method:'get',
			ngHttp:$http,
			success:function(response){
				$('.mess_table').show();
				
				$scope.riskdata = response.list;
				
			},
			error:function (error_data){
				console.log(error_data);
			}
			
			});
		}	
		
	})
	.config(['$routeProvider',function($routeProvider){
		$routeProvider.when('/riskSearch',{
			templateUrl:'riskSearch.html',
			controller:'riskSearchPage'
		});
			
	}]);