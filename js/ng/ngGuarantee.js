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
			//var csCifId = getUrlParam('csCifId');
			var cifId = getUrlParam("cifId");
			var collUrl;
			var collDetailUrl;

			if (isHistory == 'Y') {
				collUrl ="/col/cs_colls/cs_cif/"+appId+"?mtTenantId=1";
				collDetailUrl = "/col/colls/detail?cifId="+cifId+"&mtTenantId=1";
			} else {
				collUrl ="/col/coll/list?cifId="+id+"&mtTenantId=1";
				collDetailUrl = "/col/colls/detail?cifId="+id+"&mtTenantId=1";
			}

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

		/*担保详情1*/
		ngCom.ngAjax({
			url:collDetailUrl,
			method:'get',
			ngHttp:$http,
			success:function(response){
				$scope.collDetailList = response;
			},
			error:function (error_data){
				console.log(error_data);
			}
		});

		
	})
	.config(['$routeProvider','$httpProvider',function($routeProvider,$httpProvider){
		if(localStorage.token){
			$httpProvider.defaults.headers.common['Authorization'] = localStorage.token; //注入 httpProvider 设置请求头token
		}else{
			window.location.href="/index.html";
		}
		
	}]);