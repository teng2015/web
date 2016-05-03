angular.module('viewApp',['ngRoute'])
	.controller('viewController',function($scope,$http){

		function getUrlParam(name)
			{
			var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
			var r = window.location.search.substr(1).match(reg);  //匹配目标参数
			if (r!=null) return unescape(r[2]); return null; //返回参数值
			} 
		var id = getUrlParam('id');
		$scope.id =id;
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

		/*信息成功率*/

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
		$scope.toggle = function(dis) {
			  if ($scope.display!=dis) {
				  $scope.display=dis;
			  }else{
				$scope.display=-1;
			  }
			};
		/*$scope.aa = true;

		$scope.colToggle=function (index){

			$scope.aa=!$scope.aa;
		

		}*/

		/*名词解释2*/
		//$scope._index=0;

		$scope.isActivemc=function(index){
			return $scope._index==index;
			console.log($scope._index);
		}
		$scope.showPhotomc=function(index){
			return $scope._index=index;
			console.log($scope._index);
		}	
		$scope.showPhotomcout=function(index){
			return $scope._index=null;
			console.log($scope._index);
		}	
		/*业务信息acc*/
		//$scope._index2=0;

		$scope.isActive2=function(index){
			return $scope._index2==index
		}
		$scope.showPhoto2=function(index){
			var fac_col = 'fac_col_'+index;
			//alert(index)
			//alert($('#'+fac_col));
			return $scope._index2=index

		}

		$scope.isActive=function(index){
			return $scope._index3==index
		}
		$scope.showPhoto=function(index){
			var fac2_col = 'fac2_col_'+index;
			//alert(index)
			//alert($('#'+fac2_col));
			return $scope._index3=index

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
		var $explainCon=document.getElementById('explainCon');

		var $explainConTwo=document.getElementById('explainConTwo');

		var $explainFirstLiTwo=document.getElementById('explainFirstLiTwo');
		

		$scope.explainFirst=function (){

			if($explainCon.style.display=='block'){
				
				$explainCon.style.display='none';

			}else{
				$explainCon.style.display='block';

				
			}

			ngCom.ngAjax({
				url:"/maint/mtni/",
				method:'get',
				ngHttp:$http,
				success:function(data){
					
					$scope.resList = data;
					
				},
				error:function (error_data){
					console.log(error_data);
				}
			
			});
		}
		
	


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

