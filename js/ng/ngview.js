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
			
			url:"/col/facChrgs/list?cifId="+id+"&mtTenantId=1",
			method:'get',
			ngHttp:$http,
			success:function(response){	
				$scope.resJson = response.facList;;
				$scope.resColl = response.collList;
				$scope.resAcct = response.acctList;

			},
			error:function (error_data){
				console.log(error_data);
			}
			
		});

		$scope.aa = true;

		$scope.colToggle=function (index){

			$scope.aa=!$scope.aa;
		

		}
			

		/*点击担保链接金额弹出div*/
		$('.col').toggle(function (){
			
			$('.this_div').hide();
			$(this).parents('.business_line').next('.this_div').show();
		},function (){
			$('.this_div').hide();
			$(this).parents('.business_line').next('.this_div').hide();
		});
		

		/*点击账户余额*/
		$('.acc').toggle(function (){
			$('.this_div').hide();
			$(this).parents('.business_line').next('.this_div').next('.this_div').show();
		},function (){
			$('.this_div').hide();
			$(this).parents('.business_line').next('.this_div').next('.this_div').hide();
		});

		/*名词字典*/
		var $explainLi =  $('.explainUl').find('.explainFirst');

		$explainLi.click(function (){
			$('.explainCon').hide();
			$(this).next('.explainCon').show();
			
			ngCom.ngAjax({
				url:"/maint/mtni/",
				method:'get',
				ngHttp:$http,
				success:function(data){
					console.log(data);
					
					
					$scope.resList = data;
					
				},
				error:function (error_data){
					console.log(error_data);
				}
			
			});
			
		});


		/*查看导出*/
		var $explainSec = $('.explainList').find('li');

		$explainSec.click(function (){

			$('.explainListCon').hide();
			$(this).find('.explainListCon').show();
		});

		$explainSec.mouseout(function (){

			$('.explainListCon').hide();
			
		});

		/*回到顶部*/

		$('.scrollTop').click(function (){
			var sc=$(window).scrollTop();
   			$('body,html').animate({scrollTop:0},500);
		});

		/*进度条*/

		var barSumWidth = $('.progressBar').width();
		
		var barWidth = barSumWidth*0.7;
		var interval = setInterval(increment,10);
		var current = 0;
		
		function increment(){
		    current++;
		    if(current<=barWidth){
		    	$('.bar').width(current);
		    }
		  
		}

	})
	.config(['$routeProvider','$httpProvider',function($routeProvider,$httpProvider){
		$httpProvider.defaults.headers.common['Authorization'] = localStorage.token; //注入 httpProvider 设置请求头token
		
	}]);

/*$(function (){

	var $explainLi =  $('.explainUl').find('.explainFirst');

	$explainLi.click(function (){
		$('.explainCon').hide();
		$(this).next('.explainCon').show();
		
	});
	var $explainSec = $('.explainList').find('li');

	$explainSec.mouseover(function (){

		$('.explainListCon').hide();
		$(this).find('.explainListCon').show();
	});

	$explainSec.mouseout(function (){

		$('.explainListCon').hide();
		
	});
});*/