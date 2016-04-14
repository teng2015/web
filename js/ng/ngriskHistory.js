/**
 * @description angualr riskHistory
 * @author		wuhao
 * @createDate  2016-4-14
*/

angular.module('riskHistory',['ngRoute'])
	.controller('riskHistoryPage',function($scope,$http){
		$scope.srhHistory = function(){
			if($scope.nm || $scope.idNo)
			{
				ngCom.ngAjax({
					url:"/cif/customer/getCifHistoryByNameOrIdNo?nm="+$.trim(encodeURI($scope.nm))+"&idNo="+$.trim($scope.idNo)+"&mtTenantId=1",
					method:'get',
					ngHttp:$http,
					success:function(data,status){
						
					}
				
				});	
			}
			
			
		}
		
	})
	.config(['$routeProvider',function($routeProvider){
		$routeProvider.when('/riskHistory',{
			templateUrl:'riskHistory.html',
			controller:'riskHistoryPage'
		});
			
	}]);