angular.module('businessApp',['ngRoute'])
	.controller('businessController',function($scope,$http){
		function getUrlParam(name){
			var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
			var r = window.location.search.substr(1).match(reg);  //匹配目标参数
			if (r!=null) return unescape(r[2]); return null; //返回参数值
		} 
		var id = getUrlParam('id');
		var isHistory = getUrlParam('isHistory');
		var appId = getUrlParam("appId");
		var csCifId = getUrlParam('csCifId');
		var facUrl;
		if (isHistory == 'Y') {
			facUrl = "/col/csfac_chrg/list?csCifId="+csCifId+"&mtTenantId=1&appId="+appId;
		} else {
			facUrl = "/col/facChrgs/list?cifId="+id+"&mtTenantId=1";
		}
		/*业务信息*/
		ngCom.ngAjax({
			url:facUrl,
			method:'get',
			ngHttp:$http,
			success:function(response){	
				var facList =response.facList;
				for(var i =0; i< facList.length; i++){
						var isRevolvingAllowed = "否";
						if(facList[i]["isRevolvingAllowed"] == 'Y')
						{
							isRevolvingAllowed = "是";
						}
						facList[i]["isRevolvingAllowed"] =isRevolvingAllowed;
				}
				$scope.resJson = response.facList;;
				$scope.resColl = response.collList;
				$scope.resAcct = response.acctList;
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

