/**
 * @description angualr riskSearch
 * @author		wuhao
 * @createDate  2016-4-14
*/

angular.module('riskSearch',['ngRoute'])
	.controller('riskSearchPage',function($scope,$http){

		$scope.riskSearch=function (){
            var reg = new RegExp("^([a-z|A-Z|0-9|\u4e00-\u9fa5]+)$");
			//alert(reg.test($scope.nm));
			if($scope.nm == null && $scope.idText == null){
                 alert("请输入用户名或证件号！");
			}
			else if(!reg.test($scope.nm)){ 
                 alert("请输入正确的用户名！");
                 $scope.nm="";
                 $scope.idText="";
                 return false;
			}

			$('.mess_table').show();
			ngCom.ngAjax({
			url:"/cif/cifs/?nm="+encodeURI($.trim($scope.nm))+"&idNo="+$.trim($scope.idNo)+"&mtTenantId=1",
			method:'get',
			ngHttp:$http,
			success:function(response){
				
				
				$scope.riskdata = response.list;
				
				
				
			},
			error:function (error_data){
				console.log(error_data);
			},
			errfn:function (){
				$scope.riskdata = '';
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