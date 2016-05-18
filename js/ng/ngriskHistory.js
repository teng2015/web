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
					/*data:{
						nm:$.trim(encodeURI($scope.nm)),
						idNo:$.trim($scope.idNo)
					},*/
					ngHttp:$http,
					success:function(data,status){
						$scope.dataList = data.list;
					},

					error:function (error_data){
						console.log(error_data);
					},
					errfn:function (){
						$scope.dataList = '';
					}

				});
				
			}
		};
		//查看记录
		$scope.seeView=function(id){
			
			$scope.viewList=true;
			/*var cifId=$('.seeReBtn').attr('data-id');*/
			ngCom.ngAjax({
				url:'/cif/cs_cifs/list?cifId='+id+'&mtTenantId=1',
				method:'get',
				ngHttp:$http,
				success:function(data,status){
					
					$scope.hisList = data.list;
				}
			})
		};
		//查看记录--end--


		

		//添加分页 查询记录
		// $scope.seeView=function(){
		// 	//配置分页基本参数
	 //        $scope.paginationConf = {
	 //            currentPage: 1,
	 //            itemsPerPage: 5,
	 //            totalItems: 0	
	 //        };
		// 	$scope.viewList=true;
		// 	var cifId=$('.seeReBtn').attr('data-id');
		// 	ngCom.ngAjax({
		// 		url:'/cif/cs_cifs/list?cifId='+cifId+'&mtTenantId=1&pageNum='+$scope.paginationConf.currentPage+'&pageSize='+$scope.paginationConf.itemsPerPage,
		// 		method:'get',
		// 		ngHttp:$http,
		// 		success:function(data,status){
					
		// 			$scope.hisList = data.list;
		// 		}
		// 	})
		// };
        // $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', seeView);
		//分页 --end--
		
	})
	.config(['$routeProvider',function($routeProvider){
		$routeProvider.when('/riskHistory',{
			templateUrl:'riskHistory.html',
			controller:'riskHistoryPage'
		});
			
	}]);