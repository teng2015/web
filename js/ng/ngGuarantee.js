angular.module('guarApp',['ngRoute'])
	.controller('guarController',function($scope,$http){

		function getUrlParam(name)
			{
			var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
			var r = window.location.search.substr(1).match(reg);  //匹配目标参数
			if (r!=null) return unescape(r[2]); return null; //返回参数值
			} 

			var id = getUrlParam('id');
			var isHistory = getUrlParam('isHistory');
			var appId = getUrlParam("appId");
			var csCifId = getUrlParam('csCifId');
			var collUrl;

			if (isHistory == 'Y') {
				collUrl ="/col/cs_colls/cs_cif/"+appId+"?mtTenantId=1";
			} else {
				collUrl ="/col/coll/list?cifId="+id+"&mtTenantId=1";
			}

		/*担保信息*/
		/*ngCom.ngAjax({
			url:"/col/colls/detail&cif_id=id",
			method:'get',
			ngHttp:$http,
			success:function(response){
				
				$scope.no = response.;
				$scope.mtCollTypDscp= response.;
				$scope.mtCollCatDscp= response.;
				$scope.colIdNo= response.;
				$scope.colValue= response.;
				$scope.colAvailValue= response.;
				$scope.ownerCifNm= response.;
			},
			error:function (error_data){
				console.log(error_data);
			}
		});
	*/
		/*担保信息*/
		ngCom.ngAjax({
			url:collUrl,
			method:'get',
			ngHttp:$http,
			success:function(response){
				$scope.collList = response;
			},
			error:function (error_data){
				console.log(error_data);
			}
		});


	}).config(['$routeProvider','$httpProvider',function($routeProvider,$httpProvider){
		$httpProvider.defaults.headers.common['Authorization'] = localStorage.token; //注入 httpProvider 设置请求头token
		
	}]);