angular.module('viewApp',['ngRoute'])
	.controller('viewController',function($scope,$http){

		function getUrlParam(name)
			{
			var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
			var r = window.location.search.substr(1).match(reg);  //匹配目标参数
			if (r!=null) return unescape(r[2]); return null; //返回参数值
			} 
		var id = getUrlParam('id');
		/*姓名 身份证*/
		ngCom.ngAjax({
			url:"/cif/cifs/"+id+"?mtTenantId=1",
			method:'get',
			ngHttp:$http,
			success:function(response){
				
				$scope.idNo = response.idNo;
				$scope.nm= response.nm;
				$scope.age= response.age;
				
			},
			error:function (error_data){
				console.log(error_data);
			}
		
		});

		/*获取客户地址信息*/
		ngCom.ngAjax({
			url:"/cif/addrs/detail/"+id+"?mtTenantId=1",
			method:'get',
			ngHttp:$http,
			success:function(response){
				$scope.mtStateCdDscp = response[0].mtStateCdDscp;
				$scope.mtCountyCdDscp= response[0].mtCountyCdDscp;
			
				
			},
			error:function (error_data){
				console.log(error_data);
			}
		
		});

		/*居住地址*/
		/*ngCom.ngAjax({
		url:"/cif/addrs/?cif_id="+id+"&mtTenantId=1",
		method:'get',
		ngHttp:$http,
		success:function(response){
			
			
			
		},
		error:function (error_data){
			console.log(error_data);
		}
		
		});*/

		/*客户信息*/

		ngCom.ngAjax({
			url:"/cif/indvs/?cif_id="+id+"&mtTenantId=1",
			method:'get',
			ngHttp:$http,
			success:function(response){
				$scope.mtMaritalStsCdDscp = response.mtMaritalStsCdDscp;
				$scope.monthlyIncAmt= response.monthlyIncAmt;
				$scope.mtGenderCdDscp= response.mtGenderCdDscp;
				$scope.mtEduLvlCdDscp= response.mtEduLvlCdDscp;
				$scope.householdFixAssetAmt= response.householdFixAssetAmt;
				
			},
			error:function (error_data){
				console.log(error_data);
			}
			
		});

		/*业务信息*/

		ngCom.ngAjax({
			url:"/cif/facs/?cif_id="+id+"&mtTenantId=1",
			method:'get',
			ngHttp:$http,
			success:function(response){
				
				$scope.resJson = response;
				
			},
			error:function (error_data){
				console.log(error_data);
			}
			
		});
	})
	.config(['$routeProvider','$httpProvider',function($routeProvider,$httpProvider){
		$httpProvider.defaults.headers.common['Authorization'] = localStorage.token; //注入 httpProvider 设置请求头token
		
	}]);

$(function (){

	var $explainLi =  $('.explainUl').find('.explainFirst');

	$explainLi.click(function (){
		$('.explainCon').hide();
		$(this).next('.explainCon').show();
		
	});
	var $explainSec = $('.explainList').find('.explainSec');

	$explainSec.click(function (){
		console.log(1);
		$('.explainListCon').hide();
		$(this).next('.explainListCon').show();
	});
});