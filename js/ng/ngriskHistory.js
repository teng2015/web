/**
 * @description angualr riskHistory
 * @author		wuhao
 * @createDate  2016-4-14
*/

angular.module('riskHistory',['ngRoute'])
	.controller('riskHistoryPage',function($scope,$http){
		//筛选列表
		$scope.srhHistory = function(){
			//console.log($.trim(encodeURI($scope.nm)));
			//console.log($.trim($scope.idNo));
			if($scope.nm || $scope.idNo)
			{
				$scope.hisList=true;
				ngCom.ngAjax({
					url:'/cif/cs_cifs/?nm='+$.trim(encodeURI($scope.nm))+'&idNo='+$.trim($scope.idNo)+'&mtTenantId=1',
					method:'get',
					//data:{'qwe':1},
					ngHttp:$http,
					success:function(data,status){
						$scope.dataList = data.list;
					}
				});
				
			}
		};
		//查看记录
		$scope.seeView=function(){
			
			$scope.viewList=true;
			var cifId=$('.seeReBtn').attr('data-id');
			ngCom.ngAjax({
				url:'/cif/cs_cifs/list?cifId='+cifId+'&mtTenantId=1',
				method:'get',
				ngHttp:$http,
				success:function(data,status){
					
					$scope.hisList = data.list;
				}
			})
			
			
			
		};
		
		
	})
	.config(['$routeProvider',function($routeProvider){
		$routeProvider.when('/riskHistory',{
			templateUrl:'riskHistory.html',
			controller:'riskHistoryPage'
		});
			
	}]);